export async function getJSONBody(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}