import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const showPrice = (variant) => {
    if (variant === "on-sale") {
      return (
        <PriceWrapper>
          <Price>{formatPrice(price)}</Price>
          <SalePrice>{formatPrice(salePrice)}</SalePrice>
        </PriceWrapper>
      );
    }
    return <Price>{formatPrice(price)}</Price>;
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {showPrice(variant)}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
      <SmallBanner variant={variant}> {variant} </SmallBanner>
    </Link>
  );
};

const SmallBanner = styled.div`
  position: absolute;
  top: 5%;
  right: 0;
  background-color: red;
  color: white;
  padding: 11px 16px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  flex: 1 1 340px;
  flex-wrap: wrap;
  position: relative;
  max-width: 500px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  top: 0;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const PriceWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  flex-direction: column;
`;

const Price = styled.span`
  ${PriceWrapper} & {
    text-decoration: line-through;
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
