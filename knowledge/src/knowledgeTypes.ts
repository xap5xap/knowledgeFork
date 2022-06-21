import { Timestamp } from "firebase-admin/firestore";

export enum NodeType {
  "Relation" = "Relation",
  "Concept" = "Concept",
  "Code" = "Code",
  "Reference" = "Reference",
  "Idea" = "Idea",
  "Question" = "Question",
  "Profile" = "Profile",
  "Sequel" = "Sequel",
  "Advertisement" = "Advertisement",
  "News" = "News",
  "Private" = "Private",
  "Tag" = "Tag"
}

export type KnowledgeNodeContributor = {
  fullname?: string;
  reputation?: number;
  chooseUname?: boolean;
  imageUrl?: string;
  username?: string;
};

export type KnowledgeNodeInstitution = {
  reputation?: number;
  logoURL?: string;
  name?: string;
  id: string;
};

export type LinkedKnowledgeNode = {
  label?: string;
  node: string;
  title?: string;
  content?: string;
  nodeImage?: string;
  nodeType: NodeType;
};

export type KnowledgeChoice = {
  choice: string;
  correct: boolean;
  feedback: string;
};

export type NodeFireStore = {
  aChooseUname?: boolean;
  aFullname?: string;
  aImgUrl?: string;
  admin?: string;
  bookmarks?: number;
  changedAt: Timestamp;
  children?: { node?: string; label?: string; title?: string }[];
  choices?: KnowledgeChoice[];
  closedHeight?: number;
  comments?: number;
  content?: string;
  contribNames?: string[];
  contributors?: {
    [key: string]: {
      chooseUname?: boolean;
      fullname?: string;
      imageUrl?: string;
      reputation?: number;
    };
  };
  corrects?: number;
  createdAt?: Timestamp;
  deleted?: boolean;
  height?: number;
  institNames?: string[];
  institutions?: {
    [key: string]: { reputation?: number };
  };
  isTag?: boolean;
  maxVersionRating?: number;
  nodeImage?: string;
  nodeType: NodeType;
  parents?: { node?: string; label?: string; title?: string }[];
  referenceIds?: string[];
  referenceLabels?: string[];
  references?: string[] | { node: string; title?: string; label?: string }[];
  studied?: number;
  tagIds?: string[];
  tags?: string[] | { node: string; title?: string; label?: string }[];
  title?: string;
  updatedAt: Timestamp;
  versions?: number;
  viewers?: number;
  wrongs?: number;
};

export type KnowledgeNode = Omit<
  NodeFireStore,
  "updatedAt" | "changedAt" | "createdAt" | "contributors" | "institutions" | "tags" | "parents"
> & {
  id: string;
  updatedAt?: string;
  nodeImage?: string;
  changedAt?: string;
  tags?: LinkedKnowledgeNode[];
  createdAt?: string;
  choices?: KnowledgeChoice[];
  references?: LinkedKnowledgeNode[];
  contributors?: KnowledgeNodeContributor[];
  institutions?: KnowledgeNodeInstitution[];
  children?: LinkedKnowledgeNode[];
  parents?: LinkedKnowledgeNode[];
  siblings?: LinkedKnowledgeNode[];
};

export type SimpleNode = {
  id: string;
  title?: string;
  changedAt?: string;
  content?: string;
  choices: KnowledgeChoice[];
  nodeType: NodeType;
  nodeImage?: string;
  corrects?: number;
  wrongs?: number;
  tags: string[];
  contributors: { fullName: string; imageUrl: string; username: string }[];
  institutions: { name: string }[];
};

export type ResponseAutocompleteTags = {
  results?: string[];
  errorMessage?: string;
};
export type ResponseAutocompleteNodes = {
  results?: string[];
  errorMessage?: string;
};

export type TypesenseNodesSchema = {
  changedAt: string;
  changedAtMillis: number; // typesense
  choices?: KnowledgeChoice[];
  content: string; // typesense
  contributors: { fullName: string; imageUrl: string; username: string }[];
  contributorsNames: string[]; // typesense
  corrects: number; // typesense
  id: string;
  institutions: { name: string }[];
  institutionsNames: string[]; // typesense
  labelsReferences: string[]; // typesense
  nodeImage?: string;
  nodeType: NodeType; // typesense
  tags: string[]; // typesense
  title: string; // typesense
  titlesReferences: string[]; // typesense
  updatedAt: number;
  wrongs: number;
  mostHelpful: number; // typesense
};

export type TypesenseReferencesSchema = {
  id: string;
  node: string;
  title: string;
  label: string;
};

export type ResponseAutocompleteFilter = {
  results?: FilterValue[];
  errorMessage?: string;
};

export type ResponseAutocompleteReferencesFilter = {
  results?: TypesenseReferencesSchema[];
  errorMessage?: string;
};

export type ResponseAutocompleteProcessedReferencesFilter = {
  results?: FilterProcessedReferences[];
  errorMessage?: string;
};

export type ResponseAutocompleteSearch = {
  results?: string[];
  errorMessage?: string;
};

export enum TimeWindowOption {
  "AnyTime" = "Any Time",
  "ThisWeek" = "This Week",
  "ThisMonth" = "This Month",
  "ThisYear" = "This Year"
}

export enum SortTypeWindowOption {
  "MOST_RECENT" = "MOST_RECENT",
  "UPVOTES_DOWNVOTES" = "UPVOTES_DOWNVOTES",
  "NONE" = "NONE"
}

export type FilterValue = {
  id: string;
  name: string;
  imageUrl?: string | undefined;
};

export type FilterProcessedReferences = {
  id: string;
  title: string;
  data: { label: string; node: string }[];
};

export type TypesenseProcessedReferences = {
  title: string;
  data: { label: string; node: string }[];
};

export type StatsSchema = {
  institutions: string;
  users: string;
  proposals: string;
  nodes: string;
  links: string;
};

export type SearchNodesResponse = {
  data: SimpleNode[];
  page: number;
  numResults: number;
  perPage: number;
};
export type SearchNodesParams = {
  q?: string | string[];
  upvotes?: boolean;
  mostRecent?: boolean;
  timeWindow?: string | string[];
  tags?: string | string[];
  institutions?: string | string[];
  contributors?: string | string[];
  reference?: string | string[];
  label?: string | string[];
  nodeTypes?: string | string[];
  page?: number;
};

export type FeedbackInput = {
  name: string;
  email: string;
  feedback: string;
  pageURL: string;
};
