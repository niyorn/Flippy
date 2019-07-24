<template>
  <main class="home">
    <form>
      <div>
        <label>
          Sessions
          <input v-model="sessions" type="number" step="" class="sessions"
            placeholder="How many sessions do you want to do?">
        </label>
      </div>

      <div>
        <label>
          Break time (min)
          <input v-model="breakTime" type="number" step="5" min="0" max="60" class=" break-time"
            placeholder="How long do you want your break?">
        </label>
      </div>

      <div>
        <label>
          Start Time
          <input v-model="startTime" type="time" step="300" class="start-time" placeholder="When do you want to start?">
        </label>
      </div>

      <div>
        <label>
          End time
          <input v-model="endTime" type="time" step="300" class="end-time" placeholder="When do you want to stop?">
        </label>
      </div>

      <button @click.prevent="calculateSessions">Set</button>
    </form>

    <section v-if="enoughTime" class="session-container">
      <p class="description">You have {{this.sessions}} sessions of {{sessionUnitTime}} minutes</p>
      <transition-group name="session-item" tag="article">
        <SessionItem v-for="(timeFrame,index) in allSessionTimeFrame" :key="index" :index="index+1"
          :sessionStartTime='timeFrame.sessionTime.startTime' :sessionEndTime='timeFrame.sessionTime.endTime'
          :breakStartTime='timeFrame.breakTime.startTime' :breakEndTime='timeFrame.breakTime.endTime' 
        />
      </transition-group>
    </section>
  </main>
</template>

<script>
  import moment from 'moment'
  import SessionItem from '@/components/SessionItem.vue'
  // @ is an alias to /src
  export default {
    name: 'home',
    components: {
      SessionItem
    },
    data() {
      return {
        sessions: 4,
        breakTime: 20,
        startTime: '10:00',
        endTime: '14:00',
        enoughTime: false,
        sessionUnitTime: 0,
        allSessionTimeFrame: []
      }
    },
    watch: {
      sessions() {
        this.calculateSessions()
      },
      breakTime() {
        this.calculateSessions()
      },
      startTime() {
        this.calculateSessions()
      },
      endTime() {
        this.calculateSessions()
      }
    },
    methods: {
      calculateSessions() {
        const totalTime = this.calculateTimeDifference()
        const breakTime = this.calculateBreakTime()

        if (breakTime < totalTime) {
          this.enoughTime = true
          const workTime = totalTime - breakTime
          this.sessionUnitTime = Math.floor(workTime / this.sessions)
          this.showTimeFrame(this.sessionUnitTime)
        }
      },
      //calculateTimeDifferenceInMinute
      calculateTimeDifference() {
        const startTime = moment(this.startTime, "HH,mm")
        const endTime = moment(this.endTime, "HH,mm")
        //calculate the difference (in milliseconds)
        const timeDifferenceInMilliseconds = endTime.diff(startTime)
        const minute = 60 * 1000

        const timeDifferenceInMinute = timeDifferenceInMilliseconds / minute

        return timeDifferenceInMinute
      },
      calculateBreakTime() {
        const totalBreakTime = this.breakTime * this.sessions
        return totalBreakTime
      },
      showTimeFrame(sessionUnitTime) {
        // We need to know when the session need to be started, that's why a start time has been added
        const time = moment(this.startTime, 'HH:mm')
        const sessions = this.sessions
        const allSessionsTimeFrame = []

        for (let i = 0; i < sessions; i++) {
          const session = {
            sessionTime: {
              startTime: time.format('HH.mm'),
              endTime: time.add(sessionUnitTime, 'minutes').format('HH:mm')
            },
            breakTime: {
              startTime: time.format('HH.mm'),
              endTime: time.add(this.breakTime, 'minutes').format('HH.mm')
            }
          }
          allSessionsTimeFrame.push(session)
        }

        this.allSessionTimeFrame = allSessionsTimeFrame
      }
    }
  }
</script>

<style lang="scss" scoped>
  .session-container {
    .description {
      text-align: center;
    }
  }

  .session-item-enter-active, .session-item-leave-active {
    transition: all 0.2s ease-out;
  }

  .session-item-enter, .session-item-leave-to {
    transform: scale(0.7);
    opacity: 0;
  }
</style>