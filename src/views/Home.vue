<template>
  <main class="home">
    <Form
      @formHasBeenFilled="calculateSessions"
    />

    <section v-if="enoughTime" class="session-container">
      <p class="description">You have {{this.sessions}} sessions of {{sessionUnitTime}} minutes</p>
        <SessionItem v-for="(timeFrame,index) in allSessionTimeFrame" :key="timeFrame.sessionTime.startTime" :index="index+1"
          :sessionStartTime='timeFrame.sessionTime.startTime' :sessionEndTime='timeFrame.sessionTime.endTime'
          :breakStartTime='timeFrame.breakTime.startTime' :breakEndTime='timeFrame.breakTime.endTime' 
        />
    </section>
  </main>
</template>

<script>
  import moment from 'moment'
  import SessionItem from '@/components/SessionItem.vue'
  import FormWizard from '@/components/FormWizard.vue'
  // @ is an alias to /src
  export default {
    name: 'home',
    components: {
      SessionItem,
      'Form':FormWizard
    },
    data() {
      return {
        sessions: 0,
        enoughTime: false,
        sessionUnitTime: 0,
        allSessionTimeFrame: []
      }
    },
    methods: {
      calculateSessions(data) {
        const totalTime = this.calculateTimeDifference(data)
        const breakTime = this.calculateBreakTime(data)
        this.sessions = data.sessions

        if (breakTime < totalTime) {
          this.enoughTime = true
          const workTime = totalTime - breakTime
          this.sessionUnitTime = Math.floor(workTime / data.sessions)
          data.sessionUnitTime = this.sessionUnitTime
          this.showTimeFrame(data)
        }
      },
      //calculateTimeDifferenceInMinute
      calculateTimeDifference({startTime, endTime}) {
        const start = moment(startTime, "HH,mm")
        const end = moment(endTime, "HH,mm")
        //calculate the difference (in milliseconds)
        const timeDifferenceInMilliseconds = end.diff(start)
        const minute = 60 * 1000

        const timeDifferenceInMinute = timeDifferenceInMilliseconds / minute

        return timeDifferenceInMinute
      },
      calculateBreakTime({sessions, breakTime}) {
        const totalBreakTime = sessions * breakTime
        return totalBreakTime
      },
      showTimeFrame({sessionUnitTime,startTime,sessions,breakTime}) {
        
        // We need to know when the session need to be started, that's why a start time has been added
        const time = moment(startTime, 'HH:mm')
        const allSessionsTimeFrame = []

        for (let i = 0; i < sessions; i++) {
          const session = {
            sessionTime: {
              startTime: time.format('HH.mm'),
              endTime: time.add(sessionUnitTime, 'minutes').format('HH:mm')
            },
            breakTime: {
              startTime: time.format('HH.mm'),
              endTime: time.add(breakTime, 'minutes').format('HH.mm')
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
</style>