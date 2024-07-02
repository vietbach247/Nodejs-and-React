import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4 text-center">Chào Mừng Đến Với Brand Movie</h1>

          <section className="mb-4">
            <h2>Về Chúng Tôi</h2>
            <p>
              Brand Movie là nền tảng cung cấp dịch vụ xem phim trực tuyến hàng
              đầu Việt Nam, nơi bạn có thể thỏa sức đắm chìm trong hàng ngàn bộ
              phim hấp dẫn từ mọi thể loại.
            </p>
          </section>

          <section className="mb-4">
            <h3>Sứ Mệnh Của Chúng Tôi</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Đa dạng hóa nội dung:</strong> Cập nhật liên tục những
                bộ phim mới nhất từ Hollywood, Châu Á, và điện ảnh Việt Nam.
              </li>
              <li>
                <strong>Chất lượng hàng đầu:</strong> Đảm bảo trải nghiệm xem
                phim mượt mà với hình ảnh sắc nét, âm thanh sống động.
              </li>
              <li>
                <strong>Phục vụ tận tình:</strong> Hỗ trợ khách hàng mọi lúc,
                mọi nơi, giúp bạn dễ dàng tiếp cận và thưởng thức những bộ phim
                yêu thích.
              </li>
            </ul>
          </section>

          <section>
            <h3>Những Điểm Nổi Bật</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Kho phim khổng lồ:</strong> Hơn 10,000 bộ phim đủ thể
                loại từ hành động, hài hước, kinh dị, đến tâm lý, tình cảm.
              </li>
              <li>
                <strong>Giao diện thân thiện:</strong> Thiết kế đơn giản, dễ sử
                dụng, giúp bạn nhanh chóng tìm thấy bộ phim mong muốn.
              </li>
              <li>
                <strong>Xem mọi lúc, mọi nơi:</strong> Hỗ trợ xem phim trên
                nhiều thiết bị từ máy tính, điện thoại, đến smart TV.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2>Đội Ngũ Của Chúng Tôi</h2>
            <p>
              Chúng tôi tự hào sở hữu một đội ngũ làm việc nhiệt huyết, sáng tạo
              và chuyên nghiệp, luôn chung tay vì một mục tiêu duy nhất: Mang
              lại niềm vui và trải nghiệm tốt nhất cho bạn.
            </p>
          </section>

          <section className="mb-4">
            <h2>Lời Cảm Ơn</h2>
            <p>
              Brand Movie xin chân thành cảm ơn sự ủng hộ của các bạn trong suốt
              thời gian qua. Sự tin tưởng và yêu mến của các bạn chính là động
              lực để chúng tôi không ngừng nỗ lực và phát triển.
            </p>
          </section>

          <section>
            <h3>Liên Hệ</h3>
            <ul className="list-unstyled">
              <li>
                <strong>Email:</strong> support@Brand Movie.com
              </li>
              <li>
                <strong>Hotline:</strong> 1800-1234
              </li>
              <li>
                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
