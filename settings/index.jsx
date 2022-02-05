function Settings(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">Clock</Text>
        }
      >
        <Toggle
          settingsKey="use24h"
          label="Use 24 Hour Time"
          onChange={() => {
            console.log('setting timeset');
            props.settingsStorage.setItem("timeSet", "true");
          }}
        />
        {
          props.settings.use24h === "true" ? null :
            <Toggle
              settingsKey="showAmpm"
              label="Show AM/PM Indicator"
            />
        }
        <Toggle
          settingsKey="showWeekday"
          label="Show Weekday"
        />
      </Section>
      
      <Section
        title={
          <Text bold align="center">Units</Text>
        }
      >
        <Toggle
          settingsKey="useMetricDistance"
          label="Use Metric Distance Units (km)"
          onChange={() => {
            props.settingsStorage.setItem("distanceSet", "true");
          }}
        />
        <Toggle
          settingsKey="useMetricEnergy"
          label="Use Metric Energy Units (kJ)"
        />
      </Section>
      
      {/*<Section
        title={
          <Text bold align="center">Affirmations</Text>
        }
        description={
          <Text>This watch face can display daily affirmations. Enter your name to personalize the text.</Text>
        }
      >
        <Toggle
          settingsKey="showAffirmations"
          label="Show Affirmations"
        />
        <TextInput
          settingsKey="name"
          label="Your Name"
        />
      </Section>*/}
      
      <Section
        title={
          <Text bold align="center">Heart Rate</Text>
        }
      >
        <Toggle
          settingsKey="showHr"
          label="Show Heart Rate"
        />
      </Section>
      
      <Section
        title={
          <Text bold align="center">Stats Cards</Text>
        }
      >
        <Toggle
          settingsKey="showStatsCardBg"
          label="Show Stats Card Background"
        />
        <Select
          label="Card 1"
          settingsKey="card0Stat"
          selectViewTitle="Card 1 Stat"
          options={[
            { name: "None", value: "none" },
            { name: "Steps", value: "steps" },
            { name: "Distance", value: "distance" },
            { name: "Calories", value: "calories" },
            { name: "Floors", value: "floors" },
            { name: "Active Zone Minutes", value: "azm" },
          ]}
        />
        
        <Select
          label="Card 2"
          settingsKey="card1Stat"
          selectViewTitle="Card 2 Stat"
          options={[
            { name: "None", value: "none" },
            { name: "Steps", value: "steps" },
            { name: "Distance", value: "distance" },
            { name: "Calories", value: "calories" },
            { name: "Floors", value: "floors" },
            { name: "Active Zone Minutes", value: "azm" },
          ]}
        />
        
        <Select
          label="Card 3"
          settingsKey="card2Stat"
          selectViewTitle="Card 3 Stat"
          options={[
            { name: "None", value: "none" },
            { name: "Steps", value: "steps" },
            { name: "Distance", value: "distance" },
            { name: "Calories", value: "calories" },
            { name: "Floors", value: "floors" },
            { name: "Active Zone Minutes", value: "azm" },
          ]}
        />
      </Section>
      
      <Section
        title={
          <Text bold align="center">Rings</Text>
        }
      >
        <Select
          label="Ring 1"
          settingsKey="ring0Stat"
          selectViewTitle="Ring 1 Stat"
          options={[
            { name: "None", value: "none" },
            { name: "Steps", value: "steps" },
            { name: "Distance", value: "distance" },
            { name: "Calories", value: "calories" },
            { name: "Floors", value: "floors" },
            { name: "Active Zone Minutes", value: "azm" },
          ]}
        />
        
        <Select
          label="Ring 2"
          settingsKey="ring1Stat"
          selectViewTitle="Ring 2 Stat"
          options={[
            { name: "None", value: "none" },
            { name: "Steps", value: "steps" },
            { name: "Distance", value: "distance" },
            { name: "Calories", value: "calories" },
            { name: "Floors", value: "floors" },
            { name: "Active Zone Minutes", value: "azm" },
          ]}
        />
        
        <Select
          label="Ring 3"
          settingsKey="ring2Stat"
          selectViewTitle="Ring 3 Stat"
          options={[
            { name: "None", value: "none" },
            { name: "Steps", value: "steps" },
            { name: "Distance", value: "distance" },
            { name: "Calories", value: "calories" },
            { name: "Floors", value: "floors" },
            { name: "Active Zone Minutes", value: "azm" },
          ]}
        />
      </Section>
      
      <Section
        title={
          <Text bold align="center">Reset</Text>
        }
      >
        <Button
          label="Reset Settings to Defaults"
          onClick={() => {
            props.settingsStorage.clear();
            // props.settingsStorage.setItem("wasReset", "true");
          }}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);