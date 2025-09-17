import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ChartBar as BarChart3, TrendingUp, Target, Clock, Zap, Award, Calendar, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PERFORMANCE_METRICS = [
  { id: 'speed', label: 'Speed', value: 87, change: '+5', trend: 'up', icon: Zap, color: '#f59e0b' },
  { id: 'skill', label: 'Skill', value: 79, change: '+12', trend: 'up', icon: Target, color: '#3b82f6' },
  { id: 'endurance', label: 'Endurance', value: 91, change: '-2', trend: 'down', icon: Clock, color: '#10b981' },
  { id: 'teamwork', label: 'Teamwork', value: 82, change: '+8', trend: 'up', icon: Users, color: '#8b5cf6' },
];

const WEEKLY_DATA = [
  { day: 'Mon', score: 78 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 79 },
  { day: 'Thu', score: 85 },
  { day: 'Fri', score: 87 },
  { day: 'Sat', score: 91 },
  { day: 'Sun', score: 89 },
];

const ACHIEVEMENTS = [
  { id: 1, title: 'Speed Demon', description: 'Top 10% in sprint assessment', date: '2024-01-15', icon: '⚡', rarity: 'rare' },
  { id: 2, title: 'Consistency King', description: '7 days straight of assessments', date: '2024-01-12', icon: '👑', rarity: 'epic' },
  { id: 3, title: 'Form Master', description: 'Perfect technique score', date: '2024-01-10', icon: '🎯', rarity: 'legendary' },
  { id: 4, title: 'Team Player', description: 'Excellent teamwork rating', date: '2024-01-08', icon: '🤝', rarity: 'common' },
];

const TIME_PERIODS = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'quarter', label: '3 Months' },
  { id: 'year', label: 'Year' },
];

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6b7280';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const MetricCard = ({ metric }: { metric: typeof PERFORMANCE_METRICS[0] }) => (
    <View style={styles.metricCard}>
      <LinearGradient
        colors={[metric.color + '20', metric.color + '10']}
        style={styles.metricGradient}
      >
        <View style={styles.metricHeader}>
          <metric.icon size={24} color={metric.color} />
          <View style={[styles.trendBadge, { backgroundColor: metric.trend === 'up' ? '#10b981' : '#ef4444' }]}>
            <TrendingUp 
              size={12} 
              color="#ffffff" 
              style={{ transform: [{ rotate: metric.trend === 'down' ? '180deg' : '0deg' }] }} 
            />
            <Text style={styles.trendText}>{metric.change}</Text>
          </View>
        </View>
        <Text style={styles.metricValue}>{metric.value}</Text>
        <Text style={styles.metricLabel}>{metric.label}</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${metric.value}%`, backgroundColor: metric.color }
              ]} 
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const SimpleBarChart = ({ data }: { data: typeof WEEKLY_DATA }) => {
    const maxScore = Math.max(...data.map(d => d.score));
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: (item.score / maxScore) * 120,
                    backgroundColor: item.score > 85 ? '#10b981' : '#3b82f6'
                  }
                ]} 
              />
              <Text style={styles.barLabel}>{item.day}</Text>
              <Text style={styles.barValue}>{item.score}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const AchievementCard = ({ achievement }: { achievement: typeof ACHIEVEMENTS[0] }) => (
    <View style={styles.achievementCard}>
      <View style={[styles.achievementIcon, { backgroundColor: getRarityColor(achievement.rarity) + '20' }]}>
        <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
      </View>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        <Text style={styles.achievementDate}>{achievement.date}</Text>
      </View>
      <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(achievement.rarity) }]}>
        <Text style={styles.rarityText}>{achievement.rarity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10b981', '#059669']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Performance Analytics</Text>
        <Text style={styles.headerSubtitle}>Track your progress with AI insights</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.periodScroll}
          contentContainerStyle={styles.periodContainer}
        >
          {TIME_PERIODS.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.id && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            {PERFORMANCE_METRICS.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </View>
        </View>

        {/* Progress Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Weekly Progress</Text>
          <View style={styles.chartCard}>
            <SimpleBarChart data={WEEKLY_DATA} />
          </View>
        </View>

        {/* AI Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤖 AI Insights</Text>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={styles.insightGradient}
              >
                <View style={styles.insightHeader}>
                  <Target size={20} color="#ffffff" />
                  <Text style={styles.insightTitle}>Skill Development</Text>
                </View>
                <Text style={styles.insightText}>
                  Your technical skills improved by 12% this week! 
                  Focus on weak-foot training to maximize potential.
                </Text>
                <View style={styles.insightActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>View Drills</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.insightCard}>
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                style={styles.insightGradient}
              >
                <View style={styles.insightHeader}>
                  <Award size={20} color="#ffffff" />
                  <Text style={styles.insightTitle}>Strength Analysis</Text>
                </View>
                <Text style={styles.insightText}>
                  Endurance is your strongest attribute! 
                  Consider specializing in distance events or roles requiring stamina.
                </Text>
                <View style={styles.insightActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Career Path</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Recent Achievements</Text>
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>

        {/* Performance Summary */}
        <View style={styles.summaryContainer}>
          <LinearGradient
            colors={['#1f2937', '#111827']}
            style={styles.summaryGradient}
          >
            <Text style={styles.summaryTitle}>🎯 Performance Summary</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>24</Text>
                <Text style={styles.summaryLabel}>Assessments</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>85.2</Text>
                <Text style={styles.summaryLabel}>Avg Score</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>7</Text>
                <Text style={styles.summaryLabel}>Streak Days</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>Top 15%</Text>
                <Text style={styles.summaryLabel}>Global Rank</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.exportButton}>
              <Text style={styles.exportButtonText}>Export Detailed Report</Text>
            </TouchableOpacity>
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
    color: '#d1fae5',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  periodScroll: {
    marginHorizontal: -20,
  },
  periodContainer: {
    paddingHorizontal: 20,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  periodButtonActive: {
    backgroundColor: '#ffffff',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  periodTextActive: {
    color: '#10b981',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  metricGradient: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 2,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: 160,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
    color: '#9ca3af',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: 20,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 16,
  },
  insightActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  achievementCard: {
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
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementContent: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 10,
    color: '#9ca3af',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  summaryItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  exportButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  exportButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});