import csv

# Open the CSV file
with open('books.csv', 'r', encoding = 'utf-8') as file:
    # Create a CSV reader
    reader = csv.DictReader(file)

    # Open the output text file
    with open('output.txt', 'w',  encoding = 'utf-8') as output_file:
        # Extract the information for each row and write to the text file
        for row in reader:
            book_id = row['_id']
            book_title = row['name']

            # Write the extracted information to the text file
            output_file.write("có quyển " + book_title + " không?, nếu có hãy chỉ trả lời id của quyển sách, nếu không chỉ trả lời -1 " + "\n")
            output_file.write(book_id + "\n")
            output_file.write("\n")

# Print a message indicating that the extraction and writing process is complete
print("Extraction and writing to 'output.txt' is complete.")
