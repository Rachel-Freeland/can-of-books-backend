

async function createBook() {
  const Book1 = new Book({
    title: "Little House on the Prarie",
    description: "The trials and tribulations of a young girl on the prarie",
    status: "available",
    email: "littlejohn@aol.com",
  });

  const Book2 = new Book({
    title: "Little Women",
    description: "The trials and tribulations of a young girl",
    status: "available",
    email: "littlejohn@aol.com",
  });
  const Book3 = new Book({
    title: "Little Luna",
    description: "The trials and tribulations of a little dog",
    status: "available",
    email: "littlejohn@aol.com",
  });
  await Book1.save();
  await Book2.save();
  await Book3.save();
  console.log("books saved");

}
