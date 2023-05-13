# MindX_Book_ECommerce

1. Feature 1: Authorize
  - Us 1: Sign-up
    -  Email, password, username -> check DB có email chưa, username khác rỗng -> gửi ok hoặc no
       ok -> về trang sign in
       no -> thông báo đã tồn tại / username chưa có / password quy định
  - Us 2: Login
    - Email, password -> check DB đúng ko -> no / ok
      ok -> vào trang chính
      no -> thông báo sai
      Sau đó redirect về home và menu theo role
  - Us 3: Đổi mật khẩu
    - Email, pass cũ, pass mới -> check email, pass cũ khác pass mới, pass mới hợp lệ -> ok / no
      ok -> về trang sign in
      no -> thông báo sai theo các lỗi
  - Us 4: Logout
    - Accept sẽ về trang home, avatar -> nút sign in, xóa access_token
 2. Feature 2: Manage Order
    - Us 1: Tìm sách 
    search -> DB tìm keyword (tác giả, tên sách, category) -> trả về các sách thỏa mãn
    filter -> DB tìm theo category
    - Us 2: View sách
    hiện thông tin sách
    chọn số lượng 
    bấm add cart -> đăng nhập chưa: no -> page login, yes -> hiện hiệu ứng alert
    - Us 3: Giỏ hàng
    Hiện tổng tiền
    Bấm thanh toán:
 -- đăng nhập chưa ? no -> đăng nhập, yes -> trang thanh toán
 3. Feature 2: Manage Book
    - Us 1: Thêm sách mới
    - Us 2: Sửa thông tin sách
    - Us 3: Xóa sách
    - Us 4: Thêm category
 4. Fearture 4: Manage Account
    - Us 1: User có thể xem thông tin tài khoản
    - Us 2: User có thể sửa thông tin tài khoản

    
