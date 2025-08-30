// components/screens/ArticleScreen/ArticleScreen.jsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import articles from '../../data/repositories/ArticlesRepository.json';
import { PrimaryButton } from '../../components/atoms/Commons/PrimaryButton/PrimaryButton';
import { 
  Container, 
  BackButton,
  HeroContainer,
  HeroImage,
  ContentContainer,
  TitleContainer,
  ArticleTitle,
  MetaContainer,
  ReadingTime,
  PublishDate,
  BodyContainer,
  BodyText,
  Paragraph
} from './styles';

export default function ArticleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Récupère l'article depuis l'ID passé en paramètre
  const { articleId, article: articleParam } = route.params;
  const article = articleParam || articles.find(a => a.id === articleId);

  // Parse le body en paragraphes
  const paragraphs = article.body.split('\n\n').filter(p => p.trim());

  // Génère le nom de l'image basé sur l'ID de l'article  
  const getHeroImage = (articleId) => {
    // Mapping statique des images (nécessaire pour React Native)
    const imageMap = {
      '1': require('../../assets/icons/Illustration_Article_1.png'), // La lecture éclair
      '2': require('../../assets/articles/numbers.png'), // Apprendre les nombres vite
      '3': require('../../assets/articles/palais mentaux.png'), // La mémoire en action
      '4': require('../../assets/articles/cartes.png'), // Mémoriser un paquet de cartes
    };
    
    return imageMap[articleId] || require('../../assets/icons/Illustration_Article_1.png');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNumbersAction = () => {
    navigation.navigate('Tabs', {
      screen: 'Home',
      params: { screen: 'Numbers' }
    });
  };

  const handleCardsAction = () => {
    navigation.navigate('Tabs', {
      screen: 'Home', 
      params: { screen: 'Cards' }
    });
  };

  // Détermine si l'article doit avoir un bouton d'action
  const shouldShowActionButton = () => {
    return article.id === '2' || article.id === '4';
  };

  const getActionButtonProps = () => {
    if (article.id === '2') {
      return {
        onPress: handleNumbersAction,
        text: 'Commencer l\'entraînement Numbers'
      };
    } else if (article.id === '4') {
      return {
        onPress: handleCardsAction,
        text: 'Commencer l\'entraînement Cartes'
      };
    }
    return null;
  };

  return (
    <Container>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section avec image */}
        <HeroContainer>
          <HeroImage 
            source={getHeroImage(article.id)}
            resizeMode="cover"
          />
          
          {/* 🎯 Gradient overlay avec react-native-linear-gradient */}
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.1)',
              'rgba(0, 0, 0, 0.3)', 
              'rgba(0, 0, 0, 0.6)'
            ]}
            locations={[0, 0.7, 1]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          
          {/* Bouton retour flottant */}
          <BackButton 
            style={{ top: insets.top + 10 }}
            onPress={handleBack}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color="#fff" 
            />
          </BackButton>
        </HeroContainer>

        {/* Contenu de l'article */}
        <ContentContainer>
          <TitleContainer>
            <ArticleTitle>{article.title}</ArticleTitle>
            
            <MetaContainer>
              <ReadingTime>
                <Ionicons name="time-outline" size={16} color="#a0a9c0" />
                {` ${article.time} min de lecture`}
              </ReadingTime>
            </MetaContainer>
          </TitleContainer>

          <BodyContainer>
            {paragraphs.map((paragraph, index) => {
              // Détecte les titres (commencent par ###)
              if (paragraph.startsWith('### ')) {
                return (
                  <BodyText key={index} variant="h2" mb="md">
                    {paragraph.replace('### ', '')}
                  </BodyText>
                );
              }
              
              // Détecte les citations (commencent par >)
              if (paragraph.startsWith('> ')) {
                return (
                  <View key={index} style={{ 
                    borderLeftWidth: 4, 
                    borderLeftColor: '#4F7EED',
                    paddingLeft: 16,
                    marginVertical: 16,
                    backgroundColor: 'rgba(79, 126, 237, 0.05)',
                    paddingVertical: 12,
                    borderRadius: 8
                  }}>
                    <BodyText style={{ fontStyle: 'italic', color: '#4F7EED' }}>
                      {paragraph.replace('> ', '')}
                    </BodyText>
                  </View>
                );
              }

              // Détecte les listes (commencent par -)
              if (paragraph.includes('- ')) {
                const listItems = paragraph.split('\n').filter(line => line.trim().startsWith('-'));
                return (
                  <View key={index} style={{ marginVertical: 12 }}>
                    {listItems.map((item, itemIndex) => (
                      <View key={itemIndex} style={{ 
                        flexDirection: 'row', 
                        alignItems: 'flex-start',
                        marginBottom: 8 
                      }}>
                        <BodyText style={{ 
                          color: '#4F7EED', 
                          marginRight: 8,
                          fontSize: 16,
                          lineHeight: 24
                        }}>
                          •
                        </BodyText>
                        <BodyText style={{ flex: 1, lineHeight: 24 }}>
                          {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                        </BodyText>
                      </View>
                    ))}
                  </View>
                );
              }

              // Paragraphe normal
              return (
                <Paragraph key={index}>
                  {paragraph.split(/(\*\*.*?\*\*)/).map((text, textIndex) => {
                    if (text.startsWith('**') && text.endsWith('**')) {
                      return (
                        <BodyText key={textIndex} style={{ fontWeight: 'bold' }}>
                          {text.slice(2, -2)}
                        </BodyText>
                      );
                    }
                    return (
                      <BodyText key={textIndex}>
                        {text}
                      </BodyText>
                    );
                  })}
                </Paragraph>
              );
            })}
          </BodyContainer>

          {/* Bouton d'action pour les articles Numbers et Cards */}
          {shouldShowActionButton() && (
            <View style={{ 
              marginTop: 32, 
              marginBottom: 16,
              paddingHorizontal: 8
            }}>
              <PrimaryButton
                onPress={getActionButtonProps().onPress}
                style={{
                  backgroundColor: '#667eea',
                }}
              >
                {getActionButtonProps().text}
              </PrimaryButton>
            </View>
          )}
        </ContentContainer>

        {/* Espace pour éviter le chevauchement avec la navigation */}
        <View style={{ height: insets.bottom + 60 }} />
      </ScrollView>
    </Container>
  );
}    