const deleteData = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.deleteData = deleteData;
