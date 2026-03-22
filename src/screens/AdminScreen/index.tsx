import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { Button, ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';
import type { AdminVendor } from '../../api/admin';

interface AdminScreenProps {
  vendors: AdminVendor[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  processingId: string | null;
}

export function AdminScreen({ vendors, onApprove, onReject, processingId }: AdminScreenProps) {
  return (
    <>
      <SectionCard title="승인 대기 업체">
        {vendors.length === 0 ? (
          <EmptyState>승인 대기 중인 업체가 없습니다</EmptyState>
        ) : (
          vendors.map((vendor) => (
            <VendorCardWrapper key={vendor.id}>
              <ListRow
                border="none"
                left={
                  <ListRow.AssetText shape="squircle" size="medium">
                    {vendor.name.charAt(0)}
                  </ListRow.AssetText>
                }
                contents={
                  <ListRow.Texts
                    type="2RowTypeA"
                    top={vendor.name}
                    bottom={`대표: ${vendor.ownerName}`}
                  />
                }
                right={<Badge>대기</Badge>}
              />
              <DetailList>
                <DetailItem>
                  <DetailLabel>연락처</DetailLabel>
                  <DetailValue>{vendor.phone}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>주소</DetailLabel>
                  <DetailValue>{vendor.address}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>사업자번호</DetailLabel>
                  <DetailValue>{vendor.businessNumber}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>등록일</DetailLabel>
                  <DetailValue>{new Date(vendor.createdAt).toLocaleDateString('ko-KR')}</DetailValue>
                </DetailItem>
              </DetailList>
              <ButtonRow>
                <Button
                  variant="fill"
                  size="small"
                  onClick={() => onApprove(vendor.id)}
                  disabled={processingId === vendor.id}
                >
                  승인
                </Button>
                <Button
                  variant="weak"
                  size="small"
                  onClick={() => onReject(vendor.id)}
                  disabled={processingId === vendor.id}
                >
                  거절
                </Button>
              </ButtonRow>
            </VendorCardWrapper>
          ))
        )}
      </SectionCard>
    </>
  );
}

const EmptyState = styled.p({
  padding: '40px 20px',
  textAlign: 'center',
  color: colors.grey500,
  fontSize: 14,
});

const VendorCardWrapper = styled.div({
  padding: '0 20px 20px',
  '& + &': {
    borderTop: `1px solid ${colors.grey100}`,
    paddingTop: 16,
  },
});

const DetailList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '8px 0 12px',
});

const DetailItem = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 13,
});

const DetailLabel = styled.span({
  color: colors.grey500,
  flexShrink: 0,
  marginRight: 12,
});

const DetailValue = styled.span({
  color: colors.grey800,
  textAlign: 'right',
});

const Badge = styled.span({
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  backgroundColor: '#FFF3CD',
  color: '#856404',
});

const ButtonRow = styled.div({
  display: 'flex',
  gap: 8,
});