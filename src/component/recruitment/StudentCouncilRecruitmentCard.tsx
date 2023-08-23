import React from 'react';
import {
  CardContainer,
  LogoImage,
  CardInfo,
  ActivePeriod,
  Details,
  InterestTag,
  Wrapper,
  UpWrapper,
  BorderLine,
  Large,
  SecondWrapper,
  Status,
  OrganizationName,
  Title
} from './RecruitmentCardStyles';
import img from '../../assets/img.svg';
import { RecruitmentProps } from './RecruitmentProps';
import { OrganizationProps } from '../Organization/OrganizationProps';
import styled from 'styled-components';

const StudentCouncilRecruitmentCard = ({
  name,
  imageUrl,
  establishedYear,
  numberOfMember,
  isRecruit,
  campus,
  largeCategory,
  mediumCategory,
  smallCategory,
  subCategory,
  introduction,
  recruitment
}: OrganizationProps & { recruitment: RecruitmentProps }) => {
  const daysRemaining = calculateDaysRemaining(recruitment.recruitmentDeadline);
  const formattedDays = formatRemainingDays(daysRemaining);
  return (
    <CardContainer>
      <UpWrapper>
        <LogoImage src={imageUrl} alt='로고 이미지' />
        <CardInfo>
          <Wrapper>
            <SecondWrapper>
              <OrganizationName>{name}</OrganizationName>
              <Large>{largeCategory}</Large>
            </SecondWrapper>
            <ActivePeriod activePeriod={recruitment.activePeriod}>
              {recruitment.activePeriod}
            </ActivePeriod>
            <Status isRecruit={isRecruit}>
              {isRecruit ? formattedDays : '모집 종료'}
            </Status>
          </Wrapper>
          <DownWrapper>
            <p>
              {campus} · {establishedYear}년 개설 · 회원 수 {numberOfMember}
            </p>
            <Tag>
              <InterestTag>{mediumCategory}</InterestTag>
              {smallCategory != '' && subCategory == '' && (
                <InterestTag>{smallCategory}</InterestTag>
              )}
              {subCategory != '' && <InterestTag>{subCategory}</InterestTag>}
            </Tag>
          </DownWrapper>
        </CardInfo>
      </UpWrapper>
      <BorderLine></BorderLine>
      <Details>
        <Title>{recruitment.title}</Title>
        <p>{introduction}</p>
      </Details>
    </CardContainer>
  );
};

const calculateDaysRemaining = (deadline) => {
  const today = new Date();
  const targetDate = new Date(deadline);

  if (isNaN(today.getTime()) || isNaN(targetDate.getTime())) {
    // Handle invalid date input
    return -1;
  }

  const timeDiff = targetDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysRemaining;
};

const formatRemainingDays = (days) => {
  if (days === 1) {
    return '오늘 마감';
  } else {
    return `마감까지 ${days}일`;
  }
};
export default StudentCouncilRecruitmentCard;

const DownWrapper = styled.div`
  float: left;
`;

const Tag = styled.div`
  float: left;
`;
