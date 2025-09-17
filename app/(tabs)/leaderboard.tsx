import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Trophy, Medal, Crown, TrendingUp, Users, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LEADERBOARD_DATA = [
  { id: 1, name: 'Marcus Johnson', country: 'USA', sport: 'Basketball', score: 94, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'up', change: '+3' },
  { id: 2, name: 'Sofia Rodriguez', country: 'Spain', sport: 'Football', score: 92, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'up', change: '+1' },
  { id: 3, name: 'Kenji Tanaka', country: 'Japan', sport: 'Tennis', score: 91, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'down', change: '-2' },
  { id: 4, name: 'Emma Thompson', country: 'UK', sport: 'Track & Field', score: 89, avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'up', change: '+5' },
  { id: 5, name: 'Carlos Silva', country: 'Brazil', sport: 'Football', score: 88, avatar: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'same', change: '0' },
  { id: 6, name: 'Priya Patel', country: 'India', sport: 'Cricket', score: 87, avatar: 'https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'up', change: '+2' },
  { id: 7, name: 'Lars Anderson', country: 'Sweden', sport: 'Ice Hockey', score: 86, avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'up', change: '+1' },
  { id: 8, name: 'Amina Hassan', country: 'Kenya', sport: 'Marathon', score: 85, avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=100&h=100&fit=crop&crop=face', trending: 'up', change: '+4' },
];

const CATEGORIES = [
  { id: 'global', title: 'Global', icon: Trophy },
  { id: 'regional', title: 'Regional', icon: Users },
  { id: 'weekly', title: 'This Week', icon: Calendar },
  { id: 'rising', title: 'Rising Stars', icon: TrendingUp },
];

export default function LeaderboardScreen() {
  const [selectedCategory, setSelectedCategory] = useState('global');

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700'; // Gold
    if (rank === 2) return '#c0c0c0'; // Silver
    if (rank === 3) return '#cd7f32'; // Bronze
    return '#64748b';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={24} color="#ffd700" />;
    if (rank === 2) return <Medal size={24} color="#c0c0c0" />;
    if (rank === 3) return <Medal size={24} color="#cd7f32" />;
    return <Text style={[styles.rankNumber, { color: getRankColor(rank) }]}>{rank}</Text>;
  };

  const getTrendingIcon = (trending: string) => {
    if (trending === 'up') return <TrendingUp size={16} color="#10b981" />;
    if (trending === 'down') return <TrendingUp size={16} color="#ef4444" style={{ transform: [{ rotate: '180deg' }] }} />;
    return <View style={styles.noTrend} />;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fbbf24', '#f59e0b']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Global Rankings</Text>
        <Text style={styles.headerSubtitle}>Discover the world's top talent</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <category.icon 
                size={20} 
                color={selectedCategory === category.id ? '#fbbf24' : '#ffffff'} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.leaderboardContainer}>
        {/* Top 3 Podium */}
        <View style={styles.podiumContainer}>
          <Text style={styles.sectionTitle}>Champions Circle</Text>
          <View style={styles.podium}>
            {LEADERBOARD_DATA.slice(0, 3).map((athlete, index) => (
              <View key={athlete.id} style={[styles.podiumSpot, styles[`position${index + 1}` as keyof typeof styles]]}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: athlete.avatar }} style={styles.podiumAvatar} />
                  <View style={[styles.rankBadge, { backgroundColor: getRankColor(index + 1) }]}>
                    {getRankIcon(index + 1)}
                  </View>
                </View>
                <Text style={styles.podiumName}>{athlete.name.split(' ')[0]}</Text>
                <Text style={styles.podiumScore}>{athlete.score}</Text>
                <Text style={styles.podiumSport}>{athlete.sport}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Full Rankings List */}
        <View style={styles.rankingsList}>
          <Text style={styles.sectionTitle}>Full Rankings</Text>
          {LEADERBOARD_DATA.map((athlete, index) => (
            <View key={athlete.id} style={styles.rankingItem}>
              <View style={styles.rankSection}>
                {getRankIcon(index + 1)}
              </View>
              
              <Image source={{ uri: athlete.avatar }} style={styles.athleteAvatar} />
              
              <View style={styles.athleteInfo}>
                <Text style={styles.athleteName}>{athlete.name}</Text>
                <Text style={styles.athleteMeta}>{athlete.country} • {athlete.sport}</Text>
              </View>
              
              <View style={styles.scoreSection}>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreValue}>{athlete.score}</Text>
                  <View style={styles.trendingContainer}>
                    {getTrendingIcon(athlete.trending)}
                    <Text style={[
                      styles.changeText,
                      {
                        color: athlete.trending === 'up' ? '#10b981' : 
                               athlete.trending === 'down' ? '#ef4444' : '#64748b'
                      }
                    ]}>
                      {athlete.change}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Achievement Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#3b82f6', '#1d4ed8']}
              style={styles.insightGradient}
            >
              <Text style={styles.insightTitle}>📊 Weekly Trends</Text>
              <Text style={styles.insightText}>
                Basketball skills are trending up 23% this week. 
                Football technical scores show 15% improvement globally.
              </Text>
            </LinearGradient>
          </View>
          
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.insightGradient}
            >
              <Text style={styles.insightTitle}>🌟 Rising Regions</Text>
              <Text style={styles.insightText}>
                Southeast Asia showing exceptional growth in tennis talent. 
                Africa leading in marathon assessment scores.
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fef3c7',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  categoriesScroll: {
    marginHorizontal: -20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryButtonActive: {
    backgroundColor: '#ffffff',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryTextActive: {
    color: '#fbbf24',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  podiumContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  podiumSpot: {
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  position1: {
    transform: [{ scale: 1.1 }],
    zIndex: 3,
  },
  position2: {
    zIndex: 2,
  },
  position3: {
    zIndex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  rankBadge: {
    position: 'absolute',
    bottom: 4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  podiumScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginTop: 4,
  },
  podiumSport: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  rankingsList: {
    marginTop: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  rankSection: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  athleteAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 12,
  },
  athleteInfo: {
    flex: 1,
    marginLeft: 16,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  athleteMeta: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  scoreSection: {
    alignItems: 'flex-end',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginRight: 8,
  },
  trendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  noTrend: {
    width: 16,
    height: 16,
  },
  insightsContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  insightCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 20,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: 20,
  },
});