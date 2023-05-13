import { Box, Typography, useTheme } from "@material-ui/core"

const DieuKhoan = () => {
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
          <h1>Điều khoản sử dụng</h1>
          <p style={{ "text-align": "justify" }}>Chào mừng quí khách đến mua sắm tại BOOK&CHILL. Sau khi truy cập vào website BOOK&CHILL để tham khảo hoặc mua sắm, quí khách đã đồng ý tuân thủ và ràng buộc với những quy định của BOOK&CHILL. Vui lòng xem kỹ các quy định và hợp tác với chúng tôi để xây dựng 1 website BOOK&CHILL ngày càng thân thiện và phục vụ tốt những yêu cầu của chính quí khách. Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa thuận trên đây, vui lòng email cho chúng tôi qua địa chỉ support@bookandchill.com.</p>
          <p style={{ "text-align": "justify" }}>Khi sử dụng dịch vụ BOOK&CHILL, quí khách sẽ cung cấp cho chúng tôi thông tin về địa chỉ email, mật khẩu và họ tên để có được 1 tài khoản tại đây. Việc sử dụng và bảo mật thông tin tài khoản là trách nhiệm và quyền lợi của quí khách khi sử dụng BOOK&CHILL. Ngoài ra, những thông tin khác trong tài khoản như tên tuổi, địa chỉ.... là những thông tin sẽ giúp BOOK&CHILL phục vụ quý khách tốt nhất. Trong trường hợp thông tin do quí khách cung cấp không đầy đủ hoặc sai dẫn đến việc không thể giao hàng cho quí khách, chúng tôi có quyền đình chỉ hoặc từ chối phục vụ, giao hàng mà không phải chịu bất cứ trách nhiệm nào đối với quí khách. Khi có những thay đổi thông tin của quí khách, vui lòng cập nhật lại thông tin trong tài khoản tại BOOK&CHILL. Quí khách phải giữ kín mật khẩu và tài khoản, hoàn toàn chịu trách nhiệm đối với tất cả các hoạt động diễn ra thông qua việc sử dụng mật khẩu hoặc tài khoản của mình. Quí khách nên đảm bảo thoát khỏi tài khoản tại BOOK&CHILL sau mỗi lần sử dụng để bảo mật thông tin của mình</p>
          <p style={{ "text-align": "justify" }}>Quyền lợi bảo mật thông tin của khách hàng</p>
          <p style={{ "text-align": "justify" }}>Khi sử dụng dịch vụ tại website BOOK&CHILL, quí khách được đảm bảo rằng những thông tin cung cấp cho chúng tôi sẽ chỉ được dùng để nâng cao chất lượng dịch vụ dành cho khách hàng của BOOK&CHILL và sẽ không được chuyển giao cho 1 bên thứ ba nào khác vì mục đích thương mại. Thông tin của quí khách tại BOOK&CHILL sẽ được chúng tôi bảo mật và chỉ trong trường hợp pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này cho các cơ quan pháp luật.</p>
          <p class="caption" style={{ "text-align": "justify" }}>Trách nhiệm của khách hàng khi sử dụng dịch vụ của BOOK&CHILL</p>
          <p style={{ "text-align": "justify" }}>Quí khách tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay đổi cấu trúc dữ liệu tại website BOOK&CHILL. Quí khách không được có những hành động ( thực hiện, cổ vũ) việc can thiệp, xâm nhập dữ liệu của BOOK&CHILL cũng như hệ thống máy chủ của chúng tôi Ngoài ra, xin vui lòng thông báo cho quản trị web của BOOK&CHILL ngay khi quí khách phát hiện ra lỗi hệ thống theo số điện thoại (084) 65976864 hoặc mailto: support@bookandchill.com"</p>
          <p style={{ "text-align": "justify" }}>Quí khách không được đưa ra những nhận xét, đánh giá có ý xúc phạm, quấy rối, làm phiền hoặc có bất cứ hành vi nào thiếu văn hóa đối với người khác. Không nêu ra những nhận xét có tính chính trị ( tuyên truyền, chống phá, xuyên tạc chính quyền), kỳ thị tôn giáo, giới tính, sắc tộc.... Tuyệt đối cấm mọi hành vi mạo nhận, cố ý tạo sự nhầm lẫn mình là một khách hàng khác hoặc là thành viên Ban Quản Trị BOOK&CHILL</p>
          <p style={{ "text-align": "justify" }}>Trách nhiệm và quyền lợi của BOOK&CHILL</p>
          <p style={{ "text-align": "justify" }}>Trong trường hợp có những phát sinh ngoài ý muốn hoặc trách nhiệm của mình, BOOK&CHILL sẽ không chịu trách nhiệm về mọi tổn thất phát sinh. Ngoài ra, chúng tôi không cho phép các tổ chức, cá nhân khác quảng bá sản phẩm tại website BOOK&CHILL mà chưa có sự đồng ý bằng văn bản từ BOOK&CHILL Corporation. Các thỏa thuận và quy định trong Điều khoản sử dụng có thể thay đổi vào bất cứ lúc nào nhưng sẽ được BOOK&CHILL Corporation thông báo cụ thể trên website BOOK&CHILL</p>
        </Typography>
      </Box>
    </Box>

  )
}

export default DieuKhoan