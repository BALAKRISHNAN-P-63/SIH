import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { User, Settings, Trophy, Target, Bell, Shield, CircleHelp as HelpCircle, LogOut, Camera, CreditCard as Edit, Share2, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const USER_PROFILE = {
  name: 'Jordan Martinez',
  email: 'jordan.martinez@example.com',
  avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=200&h=200&fit=crop&crop=face',
  location: 'Miami, Florida',
  sport: 'Multi-Sport Athlete',
  joinDate: 'January 2024',
  overallRating: 87,
  assessments: 42,
  achievements: 15,
  globalRank: 847,
};

const PROFILE_STATS = [
  { label: 'Overall Rating', value: USER_PROFILE.overallRating, color: '#3b82f6' },
  { label: 'Assessments', value: USER_PROFILE.assessments, color: '#10b981' },
  { label: 'Achievements', value: USER_PROFILE.achievements, color: '#f59e0b' },
  { label: 'Global Rank', value: `#${USER_PROFILE.globalRank}`, color: '#8b5cf6' },
];

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'edit_profile', label: 'Edit Profile', icon: Edit, type: 'navigation' },
      { id: 'notifications', label: 'Notifications', icon: Bell, type: 'toggle', value: true },
      { id: 'privacy', label: 'Privacy Settings', icon: Shield, type: 'navigation' },
    ]
  },
  {
    title: 'Performance',
    items: [
      { id: 'goals', label: 'Performance Goals', icon: Target, type: 'navigation' },
      { id: 'training', label: 'Training Preferences', icon: Zap, type: 'navigation' },
      { id: 'export', label: 'Export Data', icon: Share2, type: 'navigation' },
    ]
  },
  {
    title: 'Support',
    items: [
      { id: 'help', label: 'Help & FAQ', icon: HelpCircle, type: 'navigation' },
      { id: 'feedback', label: 'Send Feedback', icon: Settings, type: 'navigation' },
      { id: 'logout', label: 'Sign Out', icon: LogOut, type: 'action', color: '#ef4444' },
    ]
  }
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSettingPress = (itemId: string) => {
    switch (itemId) {
      case 'logout':
        Alert.alert(
          'Sign Out',
          'Are you sure you want to sign out?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive', onPress: () => console.log('User signed out') }
          ]
        );
        break;
      case 'notifications':
        setNotificationsEnabled(!notificationsEnabled);
        break;
      default:
        console.log(`Navigate to ${itemId}`);
    }
  };

  const SettingItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => handleSettingPress(item.id)}
      disabled={item.type === 'toggle'}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, item.color && { backgroundColor: item.color + '20' }]}>
          <item.icon size={20} color={item.color || '#6b7280'} />
        </View>
        <Text style={[styles.settingLabel, item.color && { color: item.color }]}>
          {item.label}
        </Text>
      </View>
      
      {item.type === 'toggle' ? (
        <Switch
          value={item.id === 'notifications' ? notificationsEnabled : item.value}
          onValueChange={() => handleSettingPress(item.id)}
          trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
          thumbColor={notificationsEnabled ? '#ffffff' : '#f3f4f6'}
        />
      ) : (
        <Text style={styles.settingArrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6366f1', '#4f46e5']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER_PROFILE.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{USER_PROFILE.name}</Text>
            <Text style={styles.profileEmail}>{USER_PROFILE.email}</Text>
            <Text style={styles.profileMeta}>{USER_PROFILE.location} • {USER_PROFILE.sport}</Text>
            <Text style={styles.joinDate}>Member since {USER_PROFILE.joinDate}</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Edit size={16} color="#6366f1" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Profile Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Performance Overview</Text>
          <View style={styles.statsGrid}>
            {PROFILE_STATS.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <LinearGradient
                  colors={[stat.color + '20', stat.color + '10']}
                  style={styles.statGradient}
                >
                  <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { icon: '⚡', title: 'Speed Demon', color: '#f59e0b' },
              { icon: '🎯', title: 'Precision Pro', color: '#3b82f6' },
              { icon: '👑', title: 'Consistency King', color: '#8b5cf6' },
              { icon: '🔥', title: 'Hot Streak', color: '#ef4444' },
            ].map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <LinearGradient
                  colors={[achievement.color, achievement.color + '90']}
                  style={styles.achievementGradient}
                >
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Settings Sections */}
        {SETTINGS_SECTIONS.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsGroup}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  <SettingItem item={item} />
                  {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Text style={styles.appInfoTitle}>TalentScout AI</Text>
          <Text style={styles.appInfoVersion}>Version 2.1.0</Text>
          <Text style={styles.appInfoCopyright}>© 2024 TalentScout Technologies</Text>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366f1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#c7d2fe',
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 14,
    color: '#c7d2fe',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 12,
    color: '#a5b4fc',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  content: {
    flex: 1,
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  achievementCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  achievementGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  settingsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingsGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  settingArrow: {
    fontSize: 20,
    color: '#9ca3af',
    fontWeight: '300',
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 68,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  appInfoCopyright: {
    fontSize: 10,
    color: '#d1d5db',
  },
});