import { Box, Typography, useTheme } from "@material-ui/core"

const GioiThieu = () => {
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
          <h1>Giới thiệu BOOK&CHILL</h1>
          <p style={{ "text-align": "justify" }}><strong> </strong><strong>Nguồn nhân lực</strong></p>
          <p class="caption" style={{ "text-align": "justify" }}>THÔNG TIN GIỚI THIỆU CÔNG TY BOOK&CHILL</p>
          <p style={{ "text-align": "justify" }}>Để xây dựng Thương hiệu mạnh, một trong những định hướng quan trọng hàng đầu của BOOK&CHILL là chiến lược phát triển nguồn nhân lực - mấu chốt của mọi sự thành công.</p>
          <p style={{ "text-align": "justify" }}>BOOK&CHILL có hơn 200 CB-CNV, trình độ chuyên môn giỏi, nhiệt tình, năng động, chuyên nghiệp. Lực lượng quản lý BOOK&CHILL có thâm niên công tác, giỏi nghiệp vụ nhiều kinh nghiệm, có khả năng quản lý tốt và điều hành đơn vị hoạt động hiệu quả.</p>
          <p style={{ "text-align": "justify" }}>Kết hợp tuyển dụng nguồn nhân lực đầu vào có chất lượng và kế hoạch bồi dưỡng kiến thức, rèn luyện bổ sung các kỹ năng và chuẩn bị đội ngũ kế thừa theo hướng chính qui thông qua các lớp học ngắn hạn, dài hạn; các lớp bồi dưỡng CB-CNV được tổ chức trong nước cũng như ở nước ngoài đều được lãnh đạo BOOK&CHILL đặc biệt quan tâm và tạo điều kiện triển khai thực hiện. Chính vì thế, trình độ chuyên môn của đội ngũ CB-CNV ngày càng được nâng cao, đáp ứng nhu cầu ngày càng tăng của công việc cũng như sự phát triển của xã hội đang trên đường hội nhập.<strong></strong></p>
          <p style={{ "text-align": "justify" }}><strong>Về hàng hóa </strong></p>
          <p style={{ "text-align": "justify" }}>Công ty BOOK&CHILL chuyên kinh doanh: sách quốc văn, ngoại văn… </p>
          <p style={{ "text-align": "justify" }}>Sách quốc văn với nhiều thể loại đa dạng như sách giáo khoa – tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy, nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...&nbsp; của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia; Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…</p>
          <p style={{ "text-align": "justify" }}>Sách ngoại văn bao gồm: từ điển, giáo trình, tham khảo, truyện tranh thiếu nhi , sách học ngữ, từ vựng, ngữ pháp, luyện thi TOEFL, TOEIC, IELS…được nhập từ các NXB nước ngoài như<em>: </em>Cambridge, Mc Graw-Hill, Pearson Education, Oxford, Macmillan, Cengage Learning…</p>
          <p style={{ "text-align": "justify" }}>Cùng với việc phát hành độc quyền nhiều ấn bản các loại của các Nhà xuất bản là năng lực in ấn, sản xuất cung ứng nguồn hàng của Xí nghiệp in BOOK&CHILL, đã giúp Công ty luôn chủ động được nguồn hàng, nhất là các mặt hàng độc quyền như: lịch bloc, tập học sinh, sổ tay cao cấp, agenda, văn phòng phẩm, dụng cụ học tập…<strong></strong></p>
        </Typography>

      </Box>
    </Box>
  )
}

export default GioiThieu