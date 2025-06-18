// components/molecules/FeatureItem/FeatureItem.jsx
import React from 'react';
import { Container, Icon, Label, Highlight } from './styles';

/**
 * @param {{ icon: any, label: string, highlight: string }} props
 */
export function FeatureItem({ icon, label, highlight }) {
  // Split label around the highlighted word
  const [before, after] = label.split(highlight);

  return (
    <Container>
      <Icon source={icon} resizeMode="contain" />
      <Label>
        {before}
        <Highlight>{highlight}</Highlight>
        {after}
      </Label>
    </Container>
  );
}