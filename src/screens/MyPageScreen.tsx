import { SectionCard } from '../components/SectionCard';

export function MyPageScreen() {
  return (
    <>
      <SectionCard>
        <div className="profile-block">
          <div className="avatar">J</div>
          <div>
            <strong>주연</strong>
            <p>010-1234-5678</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="메뉴">
        <div className="menu-list">
          <button type="button" className="menu-item">내 정보 수정</button>
          <button type="button" className="menu-item">알림 설정</button>
          <button type="button" className="menu-item">결제 내역</button>
          <button type="button" className="menu-item">고객센터</button>
        </div>
      </SectionCard>
    </>
  );
}
