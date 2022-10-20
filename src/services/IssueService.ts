import axios from "axios";
import Issue, { IssueMetadata, IssueResponse } from "../models/Issue";

const dbApiKey = process.env.REACT_APP_DB_API_KEY_DEV || "";
const issuesDocumentUrl = "https://issuetracker-b807.restdb.io/rest/issue";

export const getAllIssues = (): Promise<IssueResponse[]> => {
  return axios
    .get(issuesDocumentUrl, {
      headers: {
        "x-api-key": dbApiKey,
      },
    })
    .then((res) => res.data);
};

export const addIssueToDb = (newIssue: Issue): Promise<IssueResponse> => {
  return axios({
    method: "post",
    url: issuesDocumentUrl,
    data: {
      assignee: newIssue.assignee,
      description: newIssue.description,
      status: newIssue.status,
    },
    headers: { "x-api-key": dbApiKey },
  }).then((res) => res.data);
};

export const deleteIssue = (id: string): Promise<string> => {
  return axios({
    method: "delete",
    url: `${issuesDocumentUrl}/${id}`,
    headers: { "x-api-key": dbApiKey },
  }).then((res) => res.data);
};
