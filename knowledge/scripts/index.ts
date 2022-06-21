import { CollectionFieldSchema } from "typesense/lib/Typesense/Collection";

import { db } from "../lib/admin";
import { NodeFireStore, TypesenseNodesSchema, TypesenseProcessedReferences } from "../src/knowledgeTypes";
import { getNodeReferences } from "./helper";
import indexCollection from "./populateIndex";

const getUsersFromFirestore = async () => {
  let users: { name: string; username: string; imageUrl: string }[] = [];
  const usersDocs = await db.collection("users").get();
  for (let userDoc of usersDocs.docs) {
    const userData = userDoc.data();
    const name = `${userData.fName || ""} ${userData.lName || ""}`;
    users.push({ name, username: userDoc.id, imageUrl: userData.imageUrl });
  }
  return users;
};

const getInstitutionsFirestore = async () => {
  const institutionDocs = await db.collection("institutions").get();
  return institutionDocs.docs.map(institutionDoc => {
    const institutionData = institutionDoc.data();
    const institutionName: string = institutionData.name || "";
    return { id: institutionDoc.id, name: institutionName };
  });
};

const getTagsFirestore = async () => {
  let tags: string[] = [];
  const tagDocs = await db.collection("nodes").where("isTag", "==", true).get();
  for (let tagDoc of tagDocs.docs) {
    const tagData = tagDoc.data();
    tags = Array.from(new Set([...tags, tagData.title]));
  }
  const tagsObjArr = tags.map((el: string) => ({ name: el }));

  return tagsObjArr;
};

const getNodeTags = (nodeData: NodeFireStore) => {
  const tags: string[] = [];
  if (nodeData.tagIds) {
    for (let tagIdx = 0; tagIdx < nodeData.tagIds.length; tagIdx++) {
      tags.push((nodeData.tags as string[])[tagIdx]);
    }
  } else {
    const tagsField = nodeData.tags as {
      node: string;
      title?: string;
    }[];
    for (let tag of tagsField) {
      if (tag.node && tag.title) {
        tags.push(tag.title);
      }
    }
  }
  return tags;
};

const getInstitutionsName = (nodeData: NodeFireStore) => {
  const institutions: string[] = [];
  const institObjs = Object.keys(nodeData.institutions || {});

  for (let name of institObjs) {
    institutions.push(name);
  }

  return institutions;
};

const getContributorsName = (nodeData: NodeFireStore): string[] => {
  const contributorsNodes = Object.entries(nodeData.contributors || {});

  const contributors = contributorsNodes.map(el => el[0]);
  return contributors;
};

// const getInstitutionByName = async (name: string) => {
//   const institutionDocs = await db.collection("institutions").where("name", "==", name).get();
//   const institutionDoc = institutionDocs.docs[0];
//   if (!institutionDoc) { return null }
//   return institutionDoc.id
// }

const getNodesData = (
  nodeDocs: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): TypesenseNodesSchema[] => {
  const getContributorsFromNode = (nodeData: NodeFireStore) => {
    return Object.entries(nodeData.contributors || {})
      .map(
        cur =>
          ({ ...cur[1], username: cur[0] } as {
            fullname: string;
            imageUrl: string;
            reputation: number;
            username: string;
          })
      )
      .sort((a, b) => (b.reputation = a.reputation))
      .map(contributor => ({
        fullName: contributor.fullname,
        imageUrl: contributor.imageUrl,
        username: contributor.username
      }));
  };

  const getInstitutionsFromNode = (nodeData: NodeFireStore) => {
    return Object.entries(nodeData.institutions || {})
      .map(cur => ({ name: cur[0], reputation: cur[1].reputation || 0 }))
      .sort((a, b) => b.reputation - a.reputation)
      .map(institution => ({ name: institution.name }));
  };

  return nodeDocs.docs.map((nodeDoc): TypesenseNodesSchema => {
    const nodeData = nodeDoc.data() as NodeFireStore;
    const contributors = getContributorsFromNode(nodeData);
    const contributorsNames = getContributorsName(nodeData);
    const institutions = getInstitutionsFromNode(nodeData);
    const institutionsNames = getInstitutionsName(nodeData);
    const tags = getNodeTags(nodeData);
    const references = getNodeReferences(nodeData);

    const titlesReferences = references.map(cur => cur.title || "").filter(cur => cur);
    const labelsReferences = references.map(cur => cur.label).filter(cur => cur);

    return {
      changedAt: nodeData.changedAt.toDate().toISOString(),
      changedAtMillis: nodeData.changedAt?.toMillis() || 0,
      choices: nodeData.choices,
      content: nodeData.content || "",
      contributors,
      contributorsNames,
      corrects: nodeData.corrects || 0,
      mostHelpful: (nodeData.corrects || 0) - (nodeData.wrongs || 0),
      id: nodeDoc.id,
      institutions,
      institutionsNames,
      labelsReferences,
      nodeImage: nodeData.nodeImage,
      nodeType: nodeData.nodeType,
      tags,
      title: nodeData.title || "",
      titlesReferences,
      updatedAt: nodeData.updatedAt?.toMillis() || 0,
      wrongs: nodeData.wrongs || 0
    };
  });
};

const getReferencesData = (nodeDocs: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
  // const nodeDocs = await db.collection("nodes").get();

  const references = nodeDocs.docs
    .map(nodeDoc => {
      const nodeData = nodeDoc.data() as NodeFireStore;
      const data = getNodeReferences(nodeData);
      return data;
    })
    .flat();

  const processedReferences: TypesenseProcessedReferences[] = references.reduce(
    (referencesSet: TypesenseProcessedReferences[], currentReference): TypesenseProcessedReferences[] => {
      const indexReference = referencesSet.findIndex(cur => cur.title === currentReference.title);
      const processedReference: TypesenseProcessedReferences = {
        title: currentReference.title || "",
        data: [{ label: currentReference.label, node: currentReference.node }]
      };
      if (indexReference < 0) return [...referencesSet, processedReference];
      referencesSet[indexReference].data = [...referencesSet[indexReference].data, ...processedReference.data];
      return referencesSet;
    },
    []
  );

  return { processedReferences };
};

const fillInstitutionsIndex = async (forceReIndex?: boolean) => {
  const data = await getInstitutionsFirestore();
  const fields: CollectionFieldSchema[] = [
    { name: "id", type: "string" },
    { name: "name", type: "string" }
  ];

  await indexCollection("institutions", fields, data, forceReIndex);
};

const fillUsersIndex = async (forceReIndex?: boolean) => {
  const data = await getUsersFromFirestore();
  const fields: CollectionFieldSchema[] = [
    { name: "username", type: "string" },
    { name: "name", type: "string" },
    { name: "imageUrl", type: "string" }
  ];
  await indexCollection("users", fields, data, forceReIndex);
};

const fillTagsIndex = async (forceReIndex?: boolean) => {
  const data = await getTagsFirestore();
  const fields: CollectionFieldSchema[] = [{ name: "name", type: "string" }];

  await indexCollection("tags", fields, data, forceReIndex);
};

const fillNodesIndex = async (
  nodeDocs: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  forceReIndex?: boolean
) => {
  // const nodeDocs = await db.collection("nodes").get();

  const data = getNodesData(nodeDocs);
  const fields: CollectionFieldSchema[] = [
    { name: "changedAtMillis", type: "int64" },
    { name: "content", type: "string" },
    { name: "contributorsNames", type: "string[]" },
    { name: "mostHelpful", type: "int32" },
    { name: "corrects", type: "int32" },
    { name: "labelsReferences", type: "string[]" },
    { name: "institutionsNames", type: "string[]" },
    { name: "nodeType", type: "string" },
    { name: "tags", type: "string[]" },
    { name: "title", type: "string" },
    { name: "titlesReferences", type: "string[]" }
  ];

  await indexCollection("nodes", fields, data, forceReIndex);
};

const fillReferencesIndex = async (
  nodeDocs: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  forceReIndex?: boolean
) => {
  const { processedReferences } = getReferencesData(nodeDocs);

  const fieldsProcessedReferences: CollectionFieldSchema[] = [{ name: "title", type: "string" }];
  if (!processedReferences.length) {
    return;
  }
  await indexCollection("processedReferences", fieldsProcessedReferences, processedReferences, forceReIndex);
};

const main = async () => {
  const nodeDocs = await db.collection("nodes").get();

  await fillUsersIndex();
  await fillInstitutionsIndex();
  await fillTagsIndex();
  await fillNodesIndex(nodeDocs, true);
  await fillReferencesIndex(nodeDocs, true);
};

main();
