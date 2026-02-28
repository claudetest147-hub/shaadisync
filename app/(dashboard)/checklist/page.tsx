'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import confetti from 'canvas-confetti'

interface Task {
  id: string
  title: string
  category: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

const initialTasks: Task[] = [
  { id: '1', title: 'Book wedding pandit/priest', category: '12 Months Before', completed: true, priority: 'high' },
  { id: '2', title: 'Finalize wedding venue', category: '12 Months Before', completed: true, priority: 'high' },
  { id: '3', title: 'Book photographer & videographer', category: '12 Months Before', completed: true, priority: 'high' },
  { id: '4', title: 'Finalize wedding caterer', category: '12 Months Before', completed: false, priority: 'high' },
  { id: '5', title: 'Book makeup artist', category: '12 Months Before', completed: false, priority: 'high' },
  
  { id: '6', title: 'Finalize Mehndi artist', category: '6 Months Before', completed: false, priority: 'high' },
  { id: '7', title: 'Book DJ/band for Sangeet', category: '6 Months Before', completed: false, priority: 'medium' },
  { id: '8', title: 'Order wedding invitations', category: '6 Months Before', completed: false, priority: 'high' },
  { id: '9', title: 'Book decorator for mandap/stage', category: '6 Months Before', completed: false, priority: 'high' },
  { id: '10', title: 'Finalize guest list', category: '6 Months Before', completed: false, priority: 'medium' },
  
  { id: '11', title: 'Order wedding outfits (lehenga/sherwani)', category: '3 Months Before', completed: false, priority: 'high' },
  { id: '12', title: 'Book hotel rooms for guests', category: '3 Months Before', completed: false, priority: 'medium' },
  { id: '13', title: 'Arrange transportation for guests', category: '3 Months Before', completed: false, priority: 'medium' },
  { id: '14', title: 'Order wedding jewelry', category: '3 Months Before', completed: false, priority: 'high' },
  { id: '15', title: 'Finalize Haldi ceremony venue', category: '3 Months Before', completed: false, priority: 'medium' },
  
  { id: '16', title: 'Send wedding invitations', category: '1 Month Before', completed: false, priority: 'high' },
  { id: '17', title: 'Finalize Sangeet playlist', category: '1 Month Before', completed: false, priority: 'medium' },
  { id: '18', title: 'Book pre-wedding photoshoot', category: '1 Month Before', completed: false, priority: 'low' },
  { id: '19', title: 'Arrange wedding return gifts', category: '1 Month Before', completed: false, priority: 'medium' },
  { id: '20', title: 'Finalize reception menu', category: '1 Month Before', completed: false, priority: 'high' },
  
  { id: '21', title: 'Confirm all vendor bookings', category: 'Week Before', completed: false, priority: 'high' },
  { id: '22', title: 'Pack for honeymoon', category: 'Week Before', completed: false, priority: 'medium' },
  { id: '23', title: 'Final dress/outfit fittings', category: 'Week Before', completed: false, priority: 'high' },
  { id: '24', title: 'Get marriage license', category: 'Week Before', completed: false, priority: 'high' },
  { id: '25', title: 'Confirm guest RSVP count', category: 'Week Before', completed: false, priority: 'high' },
  
  { id: '26', title: 'Bride & groom mehendi application', category: 'Day Before', completed: false, priority: 'high' },
  { id: '27', title: 'Haldi ceremony preparations', category: 'Day Before', completed: false, priority: 'high' },
  { id: '28', title: 'Rehearse ceremony rituals', category: 'Day Before', completed: false, priority: 'medium' },
  { id: '29', title: 'Prepare emergency kit', category: 'Day Before', completed: false, priority: 'medium' },
  { id: '30', title: 'Confirm day-of timeline with vendors', category: 'Day Before', completed: false, priority: 'high' },
]

export default function ChecklistPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const categories = [
    '12 Months Before',
    '6 Months Before',
    '3 Months Before',
    '1 Month Before',
    'Week Before',
    'Day Before',
  ]

  const toggleTask = (id: string) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      
      const task = updated.find(t => t.id === id)
      const category = task?.category
      if (category) {
        const categoryTasks = updated.filter(t => t.category === category)
        const allCompleted = categoryTasks.every(t => t.completed)
        
        if (allCompleted && task?.completed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
          setTimeout(() => {
            confetti({
              particleCount: 50,
              angle: 60,
              spread: 55,
              origin: { x: 0 }
            })
            confetti({
              particleCount: 50,
              angle: 120,
              spread: 55,
              origin: { x: 1 }
            })
          }, 250)
        }
      }
      
      return updated
    })
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const getCategoryStats = (category: string) => {
    const categoryTasks = tasks.filter(t => t.category === category)
    const completed = categoryTasks.filter(t => t.completed).length
    return { total: categoryTasks.length, completed }
  }

  const totalCompleted = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const completionPercentage = Math.round((totalCompleted / totalTasks) * 100)

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-burgundy mb-2">
            Planning Checklist
          </h1>
          <p className="text-foreground/70">
            {totalCompleted} of {totalTasks} tasks complete ({completionPercentage}%)
          </p>
        </div>

        <Button className="bg-burgundy hover:bg-burgundy/90 text-cream">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <Card className="p-6">
        <div className="relative h-4 bg-burgundy/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-burgundy rounded-full"
          />
        </div>
      </Card>

      <div className="flex gap-3">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-burgundy text-cream'
                : 'bg-burgundy/5 text-burgundy hover:bg-burgundy/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {categories.map((category, catIndex) => {
          const categoryTasks = filteredTasks.filter(t => t.category === category)
          if (categoryTasks.length === 0) return null

          const stats = getCategoryStats(category)
          const allCompleted = stats.completed === stats.total

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-heading text-xl font-bold text-burgundy">
                    {category}
                  </h2>
                  {allCompleted && (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-foreground/70">
                  {stats.completed}/{stats.total}
                </span>
              </div>

              <div className="space-y-2">
                {categoryTasks.map((task, taskIndex) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: taskIndex * 0.05 }}
                    layout
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        task.completed ? 'bg-green-50 border-green-200' : 'hover:border-burgundy/20'
                      }`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className="mt-0.5"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-burgundy/40" />
                          )}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium ${
                              task.completed
                                ? 'line-through text-foreground/50'
                                : 'text-burgundy'
                            }`}
                          >
                            {task.title}
                          </p>
                        </div>

                        {task.priority === 'high' && !task.completed && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700">
                            High Priority
                          </Badge>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
