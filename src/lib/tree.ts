import data from "@/data.json";

export type LeafData = {
  title: string;
  urgency: string;
  explanation: string;
  actions: string[];
  evidence: string[];
  authorities: string[];
  drafts: string[];
  lawyer: string;
};

export type TreeOption = {
  label: string;
  question?: string;
  options?: TreeOption[];
  leaf?: string;
};

export type Door = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  question: string;
  options: TreeOption[];
};

export type Tree = {
  title: string;
  doors: Door[];
  leaves: Record<string, LeafData>;
};

export const TREE = data as unknown as Tree;
