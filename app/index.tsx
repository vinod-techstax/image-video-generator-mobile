import { ScrollView, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { ThemeToggle } from '@/components/theme-toggle'
import { Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'

type Tab = 'features' | 'stats' | 'docs'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

interface WelcomeData {
  stats: {
    users: number
    components: number
    stars: number
  }
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="p-4 mb-4 border border-border dark:border-border-dark">
    <View className="flex-row items-center mb-2">
      <View className="w-8 h-8 mr-3 bg-primary dark:bg-primary-dark rounded-full items-center justify-center">
        <Text className="text-primary-foreground dark:text-primary-foreground-dark">{icon}</Text>
      </View>
      <Text className="text-lg font-bold text-foreground dark:text-foreground-dark">{title}</Text>
    </View>
    <Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">{description}</Text>
  </Card>
)


const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('features')

  const { data, isLoading } = useQuery<WelcomeData>({
    queryKey: ['welcomeData'],
    queryFn: () => Promise.resolve({
      stats: { users: 2547, components: 32, stars: 180 }
    }),
  })

  return (
    <ScrollView className="flex-1 bg-background dark:bg-background-dark">
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
            Starter Template
          </Text>
          <ThemeToggle />
        </View>

        <Card className="p-5 mb-6 bg-primary/5 dark:bg-primary-dark/10 border border-border dark:border-border-dark">
          <Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-2">
            Welcome to your new project!
          </Text>
          <Text className="text-base text-muted-foreground dark:text-muted-foreground-dark mb-4">
            This template includes Expo, React Native, NativeWind, Tailwind CSS, TypeScript, Zod, React Query, and reusable UI components.
          </Text>
          <Button className="mt-2">
            <Text className="text-primary-foreground dark:text-primary-foreground-dark">Get Started</Text>
          </Button>
        </Card>

        <View className="flex-row mb-6">
          {(['features', 'stats', 'docs'] as Tab[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 ${
                activeTab === tab
                  ? 'border-b-2 border-primary dark:border-primary-dark'
                  : 'border-b border-border dark:border-border-dark'
              }`}
            >
              <Text
                className={`text-center capitalize ${
                  activeTab === tab
                    ? 'text-foreground dark:text-foreground-dark font-medium'
                    : 'text-muted-foreground dark:text-muted-foreground-dark'
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === 'features' && (
          <View>
            <FeatureCard
              icon="⚡"
              title="Fast Development"
              description="NativeWind and TailwindCSS for rapid styling with type-safety"
            />
            <FeatureCard
              icon="📱"
              title="Universal UI"
              description="Works on iOS, Android and Web with the same codebase"
            />
            <FeatureCard
              icon="🔄"
              title="Data Management"
              description="React Query for server state and Zod for schema validation"
            />
          </View>
        )}

        {activeTab === 'stats' && (
          <View className="flex-row justify-between">
            {isLoading ? (
              <Text>Loading stats...</Text>
            ) : (
              <>
                <Card className="flex-1 p-4 mr-2 items-center">
                  <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
                    {data?.stats.users}
                  </Text>
                  <Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark">Users</Text>
                </Card>
                <Card className="flex-1 p-4 mx-2 items-center">
                  <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
                    {data?.stats.components}
                  </Text>
                  <Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark">Components</Text>
                </Card>
                <Card className="flex-1 p-4 ml-2 items-center">
                  <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
                    {data?.stats.stars}
                  </Text>
                  <Text className="text-xs text-muted-foreground dark:text-muted-foreground-dark">Stars</Text>
                </Card>
              </>
            )}
          </View>
        )}

        {activeTab === 'docs' && (
          <View>
            <Card className="p-4 mb-4 border border-border dark:border-border-dark">
              <Text className="text-lg font-medium text-foreground dark:text-foreground-dark mb-2">Documentation</Text>
              <Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark mb-3">
                Check out the documentation for each package included in this template.
              </Text>
              <View className="bg-muted dark:bg-muted-dark p-3 rounded-md">
                <Text className="text-base font-mono text-foreground dark:text-foreground-dark">
                  • Expo{"\n"}
                  • React Native{"\n"}
                  • NativeWind / Tailwind CSS{"\n"}
                  • TypeScript{"\n"}
                  • Zod{"\n"}
                  • React Query
                </Text>
              </View>
            </Card>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default Home



