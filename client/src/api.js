const API_URL = "http://localhost:3002";

export async function getQuestions() {
  const response = await fetch(`${API_URL}/questions`);

  if (!response.ok) {
    throw new Error("Savollarni olishda xatolik");
  }

  return response.json();
}