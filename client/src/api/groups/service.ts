const getAllGroups = async () => {
  try {
    const response = await fetch(`/api/groups/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching groups: ", error);
    throw error;
  }
};

export { getAllGroups };
