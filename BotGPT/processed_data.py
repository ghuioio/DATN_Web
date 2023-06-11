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
            output_file.write("Số lượng: " + amount + "\n")
            output_file.write("Tác giả: " + author + "\n")
            output_file.write("Bìa sách: " + book_cover + "\n")
            output_file.write("Thể loại: " + category + "\n")
            output_file.write("Mô tả: " + description + "\n")
            output_file.write("Nhà sách: " + manufacturer + "\n")
            output_file.write("Tên sách: " + book_title + "\n")
            output_file.write("Số trang: " + number_of_pages + "\n")
            output_file.write("Giá tiền: " + price + "\n")
            output_file.write("Ngày phát hàng: " + publication_date + "\n")
            output_file.write("Nhà xuất bản: " + publisher + "\n")
            output_file.write("Đánh giá: " + average_stars + "\n")
            output_file.write("Tổng số đánh giá: " + total_votes + "\n")
            output_file.write("Tổng số sao: " + total_stars + "\n")
            output_file.write("\n")

# Print a message indicating that the extraction and writing process is complete
print("Extraction and writing to 'output.txt' is complete.")
