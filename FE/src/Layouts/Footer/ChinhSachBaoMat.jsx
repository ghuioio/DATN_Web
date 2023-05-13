import { Box, Typography, useTheme } from "@material-ui/core"

const ChinhSachBaoMat = () => {
  const theme = useTheme()

  return (
    <Box
      display='flex'
      flexDirection='column'
      padding={theme.spacing(1.5)}
      boxSizing='border-box'
      style={{ backgroundColor: '#F4F3EC' }}
      width='100%'
      alignItems='center'
    >
      <Box maxWidth='1480px'>
        <Typography>
          <h1>Chính sách bảo mật</h1>
          <div style={{ "font-family": "sans-serif" }}><strong><span style={{ "font-size": "medium" }}>I. Thông tin bảo mật.</span></strong></div>
          <span style={{ "font-size": "medium" }}>Bảo mật thông tin khách hàng là một trong những ưu tiên hàng đầu nhằm tạo điều kiện mua sắm tốt nhất cho quý khách tại BOOK&CHILL. Chúng tôi hiểu sử dụng hợp lý và bảo mật thông tin sẽ thể hiện sự quan tâm của BOOK&CHILL dành cho quí khách. Vì thế, BOOK&CHILL cam kết việc sử dụng thông tin trên sẽ chỉ nhằm nâng cao chất lượng dịch vụ khách hàng và tạo môi trường mua sắm an tòan, tiện lợi tại BOOK&CHILL. Cụ thể, thông tin cá nhân của quý khách chỉ dùng với các mục đích sau:</span>
          <p><span style={{ "font-size": "medium" }}>&nbsp; 1. Số điện thoại và địa chỉ Email của quý khách được dùng nhằm</span><span style={{ "font-size": "medium" }}>&nbsp;nâng cao chất lượng dịch vụ hỗ trợ khách hàng.</span></p>
          <p><span style={{ "font-size": "medium" }}>&nbsp; 2. Địa chỉ của quý khách chỉ được dùng để BOOK&CHILL thực thiện việc giao hàng mà quý khách đã đặt trên website bookandchill.com.</span></p>
          <p><span class="hilight" style={{ "font-size": "medium" }}>&nbsp; 3. Hành vi mua hàng của quý khách chỉ giúp BOOK&CHILL tạo một trải nghiệm mua sắm tốt hơn cho quý khách.&nbsp;</span></p>
          <strong><span class="hilight"><span style={{ "font-size": "medium" }}>II. BOOK&CHILL cam kết bảo vệ thông tin của khách hàng</span></span></strong>
          <ul>
            <li><span style={{ "font-size": "medium" }}>BOOK&CHILL cam đoan sẽ không bán, chia sẻ dẫn đến làm lộ thông tin cá nhân của quý khách vì bất cứ mục đích gì. Tất cả thông tin giao dịch giữa quý khách và BOOK&CHILL sẽ được bảo mật qua phần mềm Secure Sockets Layer (SSL) bằng cách mã hóa tất cả thông tin quý khách nhập vào.</span></li>
            <li><span style={{ "font-size": "medium" }}>BOOK&CHILL&nbsp;cam kết không lưu lại bất kỳ thông tin tài khoản ngân hàng, thông tin thẻ tín dụng và thông tin tài chính của quý khách.</span></li>
          </ul>

          <p><strong><span style={{ "font-size": "medium" }}>III. Trách nhiệm của khách hàng.</span></strong></p>
          <ul>
            <li><span style={{ "font-size": "medium" }}>Quý khách không nên trao đổi những thông tin tài khoản, thanh toán, giao nhận của mình cho 1 bên thứ 3 nào khác để tránh rò rỉ thông tin. Khi sử dụng chung máy tính với nhiều người, vui lòng thoát khỏi tài khoản mỗi khi không sử dụng dịch vụ của FAHASA nữa để tự bảo vệ thông tin về mật khẩu truy cập của mình.</span></li>
            <li><span style={{ "font-size": "medium" }}>Ngoài ra, quý khách tuyệt đối không được sử dụng bất kỳ hình thức nào để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Chúng tôi nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết. Mọi thông tin của quí khách tại FAHASA sẽ được chúng tôi bảo mật nhưng trong trường hợp pháp luật yêu cầu, chúng tôi buộc phải cung cấp thông tin này cho cơ quan pháp luật</span></li>
          </ul>
        </Typography>

      </Box>
    </Box>

  )
}

export default ChinhSachBaoMat