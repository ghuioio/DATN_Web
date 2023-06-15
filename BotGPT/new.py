import csv

# Open the CSV file
with open('books.csv', 'r', encoding = 'utf-8') as file:
    # Create a CSV reader
    reader = csv.DictReader(file)

    # Open the output text file
    with open('output1.txt', 'w', encoding = 'utf-8') as output_file:
        # Extract the information for each row and write to the text file
        for row in reader:
            book_id = row['_id']
            amount = row['amount']
            author = row['author']
            book_cover = row['book_cover']
            category = row['category']
            description = row['description']
            manufacturer = row['manufacturer']
            book_title = row['name']
            number_of_pages = row['number_of_page']
            price = row['price']
            publication_date = row['publication_date']
            publisher = row['publisher']
            average_stars = row['stars.averageStars']
            total_votes = row['stars.totalAmountVotes']
            total_stars = row['stars.totalNumberStars']

            # Write the extracted information to the text file
            output_file.write("_id: " + book_id + "\n")
            output_file.write("Amount: " + amount + "\n")
            output_file.write("Author: " + author + "\n")
            output_file.write("Book Cover: " + book_cover + "\n")
            output_file.write("Category: " + category + "\n")
            output_file.write("Description: " + description + "\n")
            output_file.write("Manufacturer: " + manufacturer + "\n")
            output_file.write("Tên sách: " + book_title + "\n")
            output_file.write("Number of Pages: " + number_of_pages + "\n")
            output_file.write("Price: " + price + "\n")
            output_file.write("Publication Date: " + publication_date + "\n")
            output_file.write("Publisher: " + publisher + "\n")
            output_file.write("Average Stars: " + average_stars + "\n")
            output_file.write("Total Votes: " + total_votes + "\n")
            output_file.write("Total Stars: " + total_stars + "\n")
            output_file.write("\n")

# Print a message indicating that the extraction and writing process is complete
print("Extraction and writing to 'output.txt' is complete.")
