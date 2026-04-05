export interface MermaidTemplate {
  description: string;
  example: string;
  template: string;
  rules: string[];
}

export const MermaidTemplates: Record<string, MermaidTemplate> = {
  flowchart: {
    description: "Flowchart with top-down (TD) or left-right (LR) direction.",
    example: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[OK]
    B -->|No| D[End]`,
    template: `graph TD
    NODE1[Label1] --> NODE2[Label2]`,
    rules: [
      "Use 'graph TD' for top-down",
      "Use 'graph LR' for left-right",
      "Node shapes: box [text], circle ((text)), diamond {text}"
    ]
  },
  sequence: {
    description: "Sequence diagram for interactions between objects.",
    example: `sequenceDiagram
    Alice->>John: Hello John
    John-->>Alice: Hi Alice`,
    template: `sequenceDiagram
    participant A
    participant B
    A->>B: Message`,
    rules: [
      "Start with 'sequenceDiagram'",
      "Use '->>' for solid arrow, '-->>' for dashed arrow",
      "Use 'participant' to define actors"
    ]
  },
  mindmap: {
    description: "Mindmap for brainstorming.",
    example: `mindmap
    root((Mindmap))
        Topic1
            Subtopic1
        Topic2`,
    template: `mindmap
    root((TOPIC))
        Branch1
            Leaf1
        Branch2`,
    rules: [
      "Start with 'mindmap'",
      "Use indentation for hierarchy",
      "Root node uses double parentheses: ((text))"
    ]
  },
  classDiagram: {
    description: "Class diagram for OOP design.",
    example: `classDiagram
    class Animal {
        +String name
        +makeSound() void
    }
    class Dog {
        +fetch() void
    }
    Animal <|-- Dog`,
    template: `classDiagram
    class ClassName {
        +type attribute
        +method() returnType
    }`,
    rules: [
      "Start with 'classDiagram'",
      "+ for public, - for private, # for protected",
      "Use <|-- for inheritance"
    ]
  },
  erDiagram: {
    description: "Entity-Relationship diagram for database design.",
    example: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    CUSTOMER {
        int customer_id PK
        string name
        string email
    }
    ORDER {
        int order_id PK
        int customer_id FK
        date order_date
        string status
    }
    LINE_ITEM {
        int item_id PK
        int order_id FK
        int quantity
        float price
    }`,
    template: `erDiagram
    ENTITY1 ||--o{ ENTITY2 : relationship_label
    ENTITY1 {
        int id PK
        string name
    }
    ENTITY2 {
        int id PK
        int entity1_id FK
        string description
    }`,
    rules: [
      "Start with 'erDiagram'",
      "Entity names must be UPPERCASE without spaces, use underscore if needed: LINE_ITEM not LINE-ITEM",
      "Relationship label after colon must only contain letters, numbers, and underscores — DO NOT use special characters like >, <, &, or punctuation",
      "Cardinality: ||--|| (one to one), ||--o{ (one to zero-or-many), ||--|{ (one to one-or-many), }o--o{ (many to many)",
      "Entity attributes are written inside curly braces: { type name PK/FK }",
      "Mark primary key with PK and foreign key with FK at the end of the attribute line"
    ]
  },
  stateDiagram: {
    description: "State diagram for state machines.",
    example: `stateDiagram-v2
    [*] --> Still
    Still --> Moving
    Moving --> Stopped
    Stopped --> [*]`,
    template: `stateDiagram-v2
    [*] --> State1
    State1 --> State2 : Event
    State2 --> [*]`,
    rules: [
      "Use 'stateDiagram-v2' for the latest version",
      "[*] is the initial/final state",
      "Transition: State1 --> State2 : label"
    ]
  },
  gantt: {
    description: "Gantt chart for project scheduling.",
    example: `gantt
    title Project Schedule
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1 :2024-01-01, 7d
    Task 2 :2024-01-08, 5d`,
    template: `gantt
    title PROJECT_TITLE
    dateFormat YYYY-MM-DD
    section Section1
    Task1 :YYYY-MM-DD, Nd`,
    rules: [
      "Start with 'gantt'",
      "dateFormat defines the date format",
      "Duration: 7d = 7 days, 2w = 2 weeks"
    ]
  },
  pie: {
    description: "Pie chart for proportion visualization.",
    example: `pie title Browser Usage
    "Chrome" : 65
    "Firefox" : 15
    "Safari" : 12
    "Other" : 8`,
    template: `pie title CHART_TITLE
    "Label1" : value1
    "Label2" : value2`,
    rules: [
      "Start with 'pie'",
      "title followed by chart title",
      "Values must be numeric"
    ]
  },
  timeline: {
    description: "Timeline diagram to display a sequence of events over time.",
    example: `timeline
    title History of Social Media
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : YouTube
    2006 : Twitter`,
    template: `timeline
    title TIMELINE_TITLE
    PERIOD1 : Event1
             : Event2
    PERIOD2 : Event3`,
    rules: [
      "Start with 'timeline'",
      "title (optional) for diagram title",
      "Each period line is followed by a colon and event name: '2024 : Event'",
      "Multiple events in one period: next line starts with spaces and colon: '     : Event2'",
      "Period can be a year, month, or any text label"
    ]
  },
  architecture: {
    description: "Architecture diagram for visualizing infrastructure and system components.",
    example: `architecture-beta
    group api(cloud)[API Layer]

    service db(database)[Database] in api
    service server(server)[Server] in api
    service disk(disk)[Storage] in api

    db:L -- R:server
    server:B -- T:disk`,
    template: `architecture-beta
    group GROUP_ID(cloud)[Group Label]

    service SERVICE1(server)[Service 1] in GROUP_ID
    service SERVICE2(database)[Service 2] in GROUP_ID

    SERVICE1:R -- L:SERVICE2`,
    rules: [
      "Start with 'architecture-beta'",
      "Use 'group' to group services: group id(icon)[Label]",
      "Use 'service' to define components: service id(icon)[Label] in group_id",
      "Available icons: cloud, database, server, disk, internet, user",
      "Labels inside [ ] must only contain letters, numbers, and spaces — DO NOT use special characters like /, -, &, (, ) inside labels",
      "Connect services with: SERVICE1:SIDE -- SIDE:SERVICE2",
      "Connection sides: L (left), R (right), T (top), B (bottom)",
      "Service without a group: omit the 'in group_id' part"
    ]
  },
  journey: {
    description: "User journey diagram to map user experience through a flow or task.",
    example: `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`,
    template: `journey
    title JOURNEY_TITLE
    section Section1
      Task1: score: Actor1
      Task2: score: Actor1, Actor2
    section Section2
      Task3: score: Actor1`,
    rules: [
      "Start with 'journey'",
      "title (optional) for diagram title",
      "Use 'section' to divide phases/stages",
      "Task format: 'Task name: score: Actor1, Actor2'",
      "Score is a number 1-5 (1=hard/bad, 5=easy/good)",
      "Multiple actors separated by comma"
    ]
  }
};
