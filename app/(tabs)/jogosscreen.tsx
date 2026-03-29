import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function jogosscreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/catalogodegames.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Jogos</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"> 🎮: VALORANT</ThemedText>
        <ThemedText>
          JOGO FPS DE TIRO EM PRIMEIRA PESSOA DESENVOLVIDO PELA RIOT GAMES.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
       
          <Link.Trigger>
            <ThemedText type="subtitle">🎮: LEAGUE OF LEGENDS</ThemedText>
          </Link.Trigger>        
        <ThemedText>
          JOGO DE ESTRATÉGIA EM TEMPO REAL DESENVOLVIDO PELA RIOT GAMES.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🎮: GOD OF WAR</ThemedText>
        <ThemedText>
          JOGO DE AÇÃO E AVENTURA DESENVOLVIDO PELA SANTA MONICA STUDIO.
        </ThemedText>
      </ThemedView>
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: 390,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
