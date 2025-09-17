import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, Play, Square, Zap, Target, Clock, Users, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ASSESSMENT_TYPES = [
  { id: 'speed', title: 'Speed & Agility', icon: Zap, description: 'Sprint analysis, reaction time', color: '#f59e0b' },
  { id: 'skill', title: 'Technical Skills', icon: Target, description: 'Ball control, accuracy, technique', color: '#3b82f6' },
  { id: 'endurance', title: 'Endurance Test', icon: Clock, description: 'Cardiovascular fitness assessment', color: '#10b981' },
  { id: 'team', title: 'Team Play', icon: Users, description: 'Decision making, positioning', color: '#8b5cf6' },
];

export default function AssessmentScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  const startAssessment = async (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    setShowCamera(true);
    
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Camera permission required for talent assessment');
        return;
      }
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;
    
    setIsRecording(true);
    // Simulate AI analysis
    setTimeout(() => {
      stopRecording();
    }, 10000); // 10 second demo recording
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setShowCamera(false);
    
    // Simulate AI processing
    setTimeout(() => {
      generateAIInsights();
    }, 2000);
  };

  const generateAIInsights = () => {
    const assessmentType = ASSESSMENT_TYPES.find(a => a.id === selectedAssessment);
    
    // Simulated AI results
    const mockResults = {
      speed: {
        overallScore: 87,
        topSpeed: '24.5 km/h',
        acceleration: '0-10m: 1.8s',
        agility: '92/100',
        recommendations: ['Focus on explosive starts', 'Improve lateral movement', 'Maintain form at high speeds']
      },
      skill: {
        overallScore: 79,
        accuracy: '85%',
        ballControl: '88/100',
        technique: '75/100',
        recommendations: ['Work on weak foot', 'Improve first touch', 'Practice under pressure']
      },
      endurance: {
        overallScore: 91,
        vo2Max: '58 ml/kg/min',
        heartRate: 'Excellent recovery',
        stamina: '94/100',
        recommendations: ['Maintain current fitness', 'Add interval training', 'Focus on sport-specific endurance']
      },
      team: {
        overallScore: 82,
        decisionMaking: '85/100',
        positioning: '78/100',
        awareness: '89/100',
        recommendations: ['Study game situations', 'Improve off-ball movement', 'Enhance communication']
      }
    };

    setAiInsights(mockResults[selectedAssessment as keyof typeof mockResults]);
    setShowResults(true);
  };

  const AssessmentCard = ({ assessment }: { assessment: typeof ASSESSMENT_TYPES[0] }) => (
    <TouchableOpacity
      style={styles.assessmentCard}
      onPress={() => startAssessment(assessment.id)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[assessment.color + '20', assessment.color + '10']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <assessment.icon size={32} color={assessment.color} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{assessment.title}</Text>
            <Text style={styles.cardDescription}>{assessment.description}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: assessment.color }]}
          onPress={() => startAssessment(assessment.id)}
        >
          <Play size={16} color="#ffffff" />
          <Text style={styles.startButtonText}>Start Assessment</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (showCamera && permission?.granted) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.recordingHeader}>
              <Text style={styles.assessmentTitle}>
                {ASSESSMENT_TYPES.find(a => a.id === selectedAssessment)?.title}
              </Text>
              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>RECORDING</Text>
                </View>
              )}
            </View>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.controlButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.recordButtonActive]}
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isRecording}
              >
                {isRecording ? (
                  <Square size={32} color="#ffffff" />
                ) : (
                  <Play size={32} color="#ffffff" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
              >
                <Text style={styles.controlButtonText}>Flip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#3b82f6', '#1d4ed8']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>TalentScout AI</Text>
        <Text style={styles.headerSubtitle}>Democratizing Sports Assessment Worldwide</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127K+</Text>
            <Text style={styles.statLabel}>Athletes Assessed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.assessmentsContainer}>
        <Text style={styles.sectionTitle}>Choose Your Assessment</Text>
        
        {ASSESSMENT_TYPES.map((assessment) => (
          <AssessmentCard key={assessment.id} assessment={assessment} />
        ))}
      </View>

      <Modal visible={showResults} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          {aiInsights && (
            <ScrollView style={styles.resultsContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>AI Assessment Results</Text>
                <TouchableOpacity onPress={() => setShowResults(false)}>
                  <Text style={styles.closeButton}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.scoreCard}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.scoreGradient}
                >
                  <Award size={48} color="#ffffff" />
                  <Text style={styles.overallScore}>{aiInsights.overallScore}</Text>
                  <Text style={styles.scoreLabel}>Overall Score</Text>
                </LinearGradient>
              </View>

              <View style={styles.metricsGrid}>
                {Object.entries(aiInsights).map(([key, value]) => {
                  if (key === 'overallScore' || key === 'recommendations') return null;
                  return (
                    <View key={key} style={styles.metricCard}>
                      <Text style={styles.metricLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                      <Text style={styles.metricValue}>{String(value)}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>AI-Powered Recommendations</Text>
                {aiInsights.recommendations?.map((rec: string, index: number) => (
                  <View key={index} style={styles.recommendationItem}>
                    <View style={styles.recommendationBullet} />
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
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
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
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
  },
  assessmentsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  assessmentCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardGradient: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  recordingHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  assessmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  recordingText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  controlButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  recordButtonActive: {
    backgroundColor: '#dc2626',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  resultsContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  scoreCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  scoreGradient: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  overallScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#d1fae5',
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  recommendationsContainer: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 6,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});