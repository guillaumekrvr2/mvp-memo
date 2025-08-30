// components/molecules/Commons/DisciplineHeader/DisciplineHeader.jsx
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AccountContext } from '../../../../contexts/AccountContext';
import * as S from './styles';

export default function DisciplineHeader({ disciplineName }) {
  const navigation = useNavigation();
  const { current } = useContext(AccountContext);

  return (
    <S.SafeArea>
      <S.Container>
        {/* Chevron de gauche */}
        <S.BackButton
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back-outline" size={28} color="#fff" />
        </S.BackButton>

        {/* Nom de la discipline centré */}
        <S.Title>{disciplineName}</S.Title>

        {/* Icône de profil à droite */}
        <S.ProfileButton
          onPress={() => {
            if (current) {
              navigation.navigate('Profile');
            } else {
              navigation.getParent()?.navigate('Login');
            }
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="person-outline" size={26} color="#fff" />
        </S.ProfileButton>
      </S.Container>
    </S.SafeArea>
  );
}