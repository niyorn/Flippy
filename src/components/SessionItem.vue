<template>
    <section class="session-item-container">
        <div class="session-item">
            <p class="item session">
                <span class="title">
                    Session {{index}}: 
                </span>    
                <span class="time">
                    {{sessionStartTime}} - {{sessionEndTime}}
                </span>
            </p>
            <p class="item break">
                <span class="title">
                    Break: 
                </span> 
                <span class="time">
                    {{breakStartTime}} - {{breakEndTime}}
                </span>
            </p>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'SessionItem',
        props: {
            index: {
                type: Number
            },
            sessionStartTime: {
                type: String,
                required: true
            },
            sessionEndTime: {
                type: String,
                required: true
            },
            breakStartTime: {
                type: String,
                required: true
            },
            breakEndTime: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .session-item-container {
        list-style: none;

        .session-item {
            margin: 1rem;
            margin-bottom: 4rem;
            display: grid;
            grid-template-rows: 1.5fr 1fr;

            .item {
                padding: 1rem;
                font-size: 1.4rem;
                display: flex;
                flex-direction: column;

                .title {
                    font-weight: 700;
                }

                .time {
                    font-weight: 400;
                    margin-top: 1rem;
                }
            }

            .session {
                background-color: #9be2fd;
            }

            .break {
                background-color: #bef9be;
                margin-top: 1rem;
            }
        }
    }
</style>