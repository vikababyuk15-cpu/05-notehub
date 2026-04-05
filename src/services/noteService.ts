import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const NOTEHUB_BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

async function fetchNotes({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params: { page: number; perPage: number; search?: string } = {
    page,
    perPage,
  };
  if (search) params.search = search;
  const response: AxiosResponse<FetchNotesResponse> = await axios.get(
    `${NOTEHUB_BASE_URL}/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );
  // Повертаємо totalPages, total, notes
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

async function createNote(note: CreateNoteParams): Promise<Note> {
  try {
    const response: AxiosResponse<Note> = await axios.post(
      `${NOTEHUB_BASE_URL}/notes`,
      note,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

async function deleteNote(noteId: string): Promise<Note> {
  try {
    const response: AxiosResponse<Note> = await axios.delete(
      `${NOTEHUB_BASE_URL}/notes/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

export default {
  fetchNotes,
  createNote,
  deleteNote,
};
