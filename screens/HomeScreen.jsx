// screens/HomeScreen.jsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Grid,
  LearnMoreButton,
  LearnMoreText,
} from '../styled-components/HomeStyles';
import { MenuButton } from '../components/MenuButton';

export default function HomeScreen() {
  const navigation = useNavigation();
  const options = [
    { label: 'Numbers', screen: 'Numbers' },
    { label: 'Cards',   screen: 'Cards'   },
    { label: 'Words',   screen: 'Words'   },
    { label: 'Binary',  screen: 'Binary'  },
    { label: 'Names',   screen: 'Names'   },
    { label: 'Images',  screen: 'Images'  },
  ];

  return (
    <Container>
      <Grid>
        {options.map(o => (
          <MenuButton
            key={o.screen}
            label={o.label}
            onPress={() => navigation.navigate(o.screen)}
          />
        ))}
      </Grid>
      <LearnMoreButton onPress={() => {/* action */}}>
        <LearnMoreText>Learn more</LearnMoreText>
      </LearnMoreButton>
    </Container>
  );
}
