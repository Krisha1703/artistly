export function buildContext(artists) {
  return artists.map((a) => ({
    name: a.name,
    summary: `
${a.name} is a ${a.category?.join(", ")} artist based in ${a.location}.
They perform in ${a.languages?.join(", ")}.
Available during: ${a.availability?.join(", ")}.
Fee: ${a.feeRange}.
Rating: ${a.rating}.
About: ${a.bio}
    `.trim(),
  }));
}