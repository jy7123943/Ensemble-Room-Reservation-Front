import { Button, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../components/SectionCard';

export function ReviewScreen() {
  return (
    <>
      <SectionCard title="별점">
        <div className="rating-row">
          <button type="button">★</button>
          <button type="button">★</button>
          <button type="button">★</button>
          <button type="button">★</button>
          <button type="button">★</button>
        </div>
      </SectionCard>

      <SectionCard title="리뷰 작성">
        <TextArea
          variant="box"
          minHeight={180}
          placeholder="룸 컨디션, 장비 상태, 접근성 등을 적어주세요."
        />
      </SectionCard>

      <div className="sticky-cta">
        <Button size="xlarge" display="full">
          리뷰 등록
        </Button>
      </div>
    </>
  );
}
