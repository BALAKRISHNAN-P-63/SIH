import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Heart, MessageCircle, Share2, Search, Filter, Users, MapPin, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const COMMUNITY_POSTS = [
  {
    id: 1,
    user: { name: 'Alex Rivera', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face', location: 'Barcelona, Spain' },
    content: 'Just crushed my sprint assessment! 🏃‍♂️ AI feedback helped me improve my form by 15%. The future of sports training is here! #TalentScout #SprintTraining',
    image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?w=400&h=300&fit=crop',
    likes: 127,
    comments: 23,
    timestamp: '2h ago',
    tags: ['Speed', 'Training', 'AI'],
    achievements: ['Speed Demon', 'Form Master']
  },
  {
    id: 2,
    user: { name: 'Maya Chen', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face', location: 'Tokyo, Japan' },
    content: 'Tennis technique session complete! 🎾 The AI spotted my weak backhand and gave me personalized drills. Already seeing improvement!',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?w=400&h=300&fit=crop',
    likes: 89,
    comments: 15,
    timestamp: '4h ago',
    tags: ['Tennis', 'Technique', 'Improvement'],
    achievements: ['Technique Pro']
  },
  {
    id: 3,
    user: { name: 'Jordan Smith', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop&crop=face', location: 'London, UK' },
    content: 'Community challenge complete! 🏆 90% accuracy on ball control drills. Thanks to everyone who shared tips in the comments!',
    likes: 156,
    comments: 31,
    timestamp: '6h ago',
    tags: ['Football', 'Challenge', 'Community'],
    achievements: ['Team Player', 'Ball Master']
  },
];

const TRENDING_TOPICS = [
  { id: 1, tag: 'Basketball', posts: 1247, trending: true },
  { id: 2, tag: 'AI Training', posts: 892, trending: true },
  { id: 3, tag: 'Speed Training', posts: 634, trending: false },
  { id: 4, tag: 'Mental Game', posts: 421, trending: true },
  { id: 5, tag: 'Recovery', posts: 318, trending: false },
];

const GLOBAL_CHALLENGES = [
  {
    id: 1,
    title: 'Global Sprint Week',
    description: '10m sprint challenge - beat your personal best!',
    participants: 15742,
    timeLeft: '3 days',
    reward: 'Sprint Champion Badge',
    color: '#f59e0b'
  },
  {
    id: 2,
    title: 'Precision Masters',
    description: 'Football accuracy challenge',
    participants: 8934,
    timeLeft: '1 week',
    reward: 'Accuracy Pro Badge',
    color: '#3b82f6'
  }
];

export default function CommunityScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const CommunityPost = ({ post }: { post: typeof COMMUNITY_POSTS[0] }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementBadge}>
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
          <View style={styles.userMetaRow}>
            <MapPin size={12} color="#6b7280" />
            <Text style={styles.userLocation}>{post.user.location}</Text>
            <Text style={styles.timestamp}>• {post.timestamp}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <View style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={20} color="#ef4444" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6b7280" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color="#6b7280" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ChallengeCard = ({ challenge }: { challenge: typeof GLOBAL_CHALLENGES[0] }) => (
    <TouchableOpacity style={styles.challengeCard}>
      <LinearGradient
        colors={[challenge.color, challenge.color + '90']}
        style={styles.challengeGradient}
      >
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <View style={styles.participantsBadge}>
            <Users size={12} color="#ffffff" />
            <Text style={styles.participantsText}>{challenge.participants.toLocaleString()}</Text>
          </View>
        </View>
        <Text style={styles.challengeDescription}>{challenge.description}</Text>
        <View style={styles.challengeFooter}>
          <Text style={styles.timeLeft}>⏰ {challenge.timeLeft} left</Text>
          <Text style={styles.reward}>🏆 {challenge.reward}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Community Hub</Text>
        <Text style={styles.headerSubtitle}>Connect • Share • Improve Together</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#8b5cf6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts, athletes, topics..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#8b5cf6" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Global Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Global Challenges</Text>
            <Zap size={20} color="#f59e0b" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {GLOBAL_CHALLENGES.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </ScrollView>
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Trending Now</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.topicsScroll}
          >
            {TRENDING_TOPICS.map((topic) => (
              <TouchableOpacity key={topic.id} style={styles.topicCard}>
                <View style={styles.topicHeader}>
                  <Text style={styles.topicTag}>#{topic.tag}</Text>
                  {topic.trending && (
                    <View style={styles.trendingIndicator}>
                      <Text style={styles.trendingText}>🔥</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.topicPosts}>{topic.posts} posts</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Community Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Community Feed</Text>
          {COMMUNITY_POSTS.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))}
        </View>

        {/* Community Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            style={styles.statsGradient}
          >
            <Text style={styles.statsTitle}>🌍 Global Community Impact</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2.3M+</Text>
                <Text style={styles.statLabel}>Active Athletes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>45K</Text>
                <Text style={styles.statLabel}>Daily Assessments</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>180+</Text>
                <Text style={styles.statLabel}>Countries</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>
          </LinearGradient>
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
    color: '#ddd6fe',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  challengeCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  challengeGradient: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  participantsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantsText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLeft: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  reward: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  topicsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  topicCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  topicTag: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  trendingIndicator: {
    marginLeft: 4,
  },
  trendingText: {
    fontSize: 12,
  },
  topicPosts: {
    fontSize: 12,
    color: '#6b7280',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: 8,
  },
  achievementBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
  },
  achievementText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocation: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  statsContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsGradient: {
    padding: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#bfdbfe',
    marginTop: 4,
    textAlign: 'center',
  },
});