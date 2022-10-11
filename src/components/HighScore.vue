const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count():number {
          return this.$store.state.count;
        },
      },
    };

    <template>
        <p id="highScore" class="highScore">HIGHSCORE: {{ highScore }}</p>
    </template>