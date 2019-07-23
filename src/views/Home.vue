<template>
  <main class="home">
    <form >
      <div>
        <label>
          Sessions
          <input v-model="sessions" type="number" class="sessions" placeholder="How many sessions do you want to do?">
        </label>
      </div>

      <div>
        <label>
          Break time
          <input v-model="breakTime" type="number" min="0" max="60" class=" break-time" placeholder="How long do you want your break?">
        </label>
      </div>

      <div>
        <label>
          Start Time
          <input v-model="startTime" type="time" class="start-time" placeholder="When do you want to start?">
        </label>
      </div>

      <div>
        <label>
          End time
          <input v-model="endTime" type="time" class="end-time" placeholder="When do you want to stop?">
        </label>
      </div>

      <button @click.prevent="calculateSessions">Set</button>
    </form>

    <p v-if="enoughTime">your session consist of: {{sessionUnitTime}} minutes</p>
    <ul v-for="timeFrame in allSessionTimeFrame" :key="timeFrame.id">
      <li>
        <p>sessionTime: {{timeFrame.sessionTime.startTime}} - {{timeFrame.sessionTime.endTime}}</p>
        <p>breakTime: {{timeFrame.breakTime.startTime}} - {{timeFrame.breakTime.endTime}}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import moment from 'moment'
// @ is an alias to /src
export default {
  name: 'home',
  data() {
    return {
      sessions: 0,
      breakTime: 0,
      startTime: '',
      endTime: '',
      enoughTime: false,
      sessionUnitTime: 0,
      allSessionTimeFrame: []
    }
  },
  computed: {
  },
  methods: {
    calculateSessions() {
      const totalTime = this.calculateTimeDifference()
      const breakTime = this.calculateBreakTime()

      if(breakTime < totalTime) {
        this.enoughTime = true
        const workTime = totalTime - breakTime
        this.sessionUnitTime = Math.floor(workTime/this.sessions)
        this.showTimeFrame(this.sessionUnitTime)
      }
    },
    //calculateTimeDifferenceInMinute
    calculateTimeDifference() {
      const startTime = moment(this.startTime, "HH,mm")
      const endTime = moment(this.endTime, "HH,mm")
      //calculate the difference (in milliseconds)
      const timeDifferenceInMilliseconds = endTime.diff(startTime)
      const minute = 60*1000

      const timeDifferenceInMinute = timeDifferenceInMilliseconds/minute

      return timeDifferenceInMinute
    },
    calculateBreakTime() {
      const totalBreakTime = this.breakTime*this.sessions
      return totalBreakTime
    },
    showTimeFrame(sessionUnitTime) {
       // We need to know when the session need to be started, that's why a start time has been added
      const time = moment(this.startTime, 'HH:mm')
      const sessions = this.sessions
      const allSessionsTimeFrame = []

      for(let i = 0; i < sessions; i++) {
        const session = {
          sessionTime : {
            startTime: time.format('HH.mm'),
            endTime: time.add(sessionUnitTime, 'minutes').format('HH:mm')
          },
          breakTime : 
            { 
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
