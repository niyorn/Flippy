<template>
    <section>
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
                    <input v-model="startTime" type="time" step="300" class="start-time"
                        placeholder="When do you want to start?">
                </label>
            </div>

            <div>
                <label>
                    End time
                    <input v-model="endTime" type="time" step="300" class="end-time"
                        placeholder="When do you want to stop?">
                </label>
            </div>

            <button @click.prevent="formHasBeenFilled">Set</button>
        </form>
    </section>
</template>

<script>
    export default {
        name: "FormWizard",
        data() {
            return {
                sessions: 4,
                breakTime: 20,
                startTime: '10:00',
                endTime: '14:00',
            }
        },
        watch: {
            sessions() {
                this.formHasBeenFilled()
            },
            breakTime() {
                this.formHasBeenFilled()
            },
            startTime() {
                this.formHasBeenFilled()
            },
            endTime() {
                this.formHasBeenFilled()
            }
        },
        computed: {
            data() {
                const data = {
                    sessions: this.sessions,
                    breakTime: this.breakTime,
                    startTime: this.startTime,
                    endTime: this.endTime
                }

                return data
            }
        },
        methods: {
            formHasBeenFilled() {
                this.$emit('formHasBeenFilled', this.data)
            }
        }
    }
</script>

<style>

</style>