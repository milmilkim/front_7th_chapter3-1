# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

최근 회사에서 어드민 두 개 만들면서 shadcn + tailwind4를 사용하여 작업했었는데 이 과제도 비슷한 스타일로 작업했다.
이번 과제는 디자인 토큰/시스템을 디자이너가 설계했다고 가정했을 때 개발자가 할 일이 무엇인지를 중점으로 두고 작업했다. 따라서 디자인 토큰을 '어디까지' 쪼갤 것인지에 대한 부분은 적당히 하고 넘어갔다.

우선 Button, Badge, Header같은 단순 컴포넌트를 교체해본 후, 전체적인 Before 패키지의 개발 내용을 파악하여 마이그레이션 했다. 큰 설계는 내가 했으나 단순 CRUD, 레거시의 컬러 추출, 리팩토링, 스토리북 작성 작업은 AI 에이전트를 만드느라 결제했던 클로드 코드가 아직 남아있었기에 아낌없이 사용하였다.

Before 패키지에서 발견한 문제점
css 파일의 하드코딩된 색상: 다크모드 지원 불가능
일관성 부족한 디자인 (ex: badge가 border-radius가 다른 두 가지 타입이 있을 이유가 없다.)
일관되지 않은 Prop 이름
재사용 불가능한 Button들 (entity를 받아서 내부적으로 분기)
타입 안정성 부족
UI 컴포넌트가 비즈니스 로직을 포함함
Input 안에 밸리데이션이 내장되어 있고 분기가 복잡함
컴포넌트 내부의 분기 처리로 인해 유지보수가 힘들고 조사(을/를)처리도 잘못 되어있음
과한 디렉토리 구분 (atoms, molecules, organisms)
after
css 변수로 관리. 시맨틱 토큰으로 컬러 정리. 테마 관리 중앙화.
단일 디자인 시스템으로 변경. CVA로 관리.
일관성 있는 Props로 변경.
순수 UI 컴포넌트로 변경
UI 컴포넌트와 비즈니스 로직 분리.
zod+RHF로 선언적으로 폼 검증.
flat 구조로 개편
개편 과정에서 집중한 부분
너무 과하게 파일 분리 되는 것을 지양하고 디렉토리 depth가 깊어지지 않게 flat구조로 개선했다.
유지보수와 확장성을 항상 고려해야 하는 것은 맞으나, 규모가 작을 때 미리 커질 것을 모두 대비하여 과하게 구조를 잡는 것은 결국 불필요한 생산성 저하로 이어지기 때문이다. 추후에 도메인 단위로 세분화가 필요할 경우에 변경하는 걸로 충분할 것이다.
```
components/
  ├── ui/              
  │   ├── button.tsx
  │   ├── badge.tsx
  │   ├── input.tsx
  │   ├── textarea.tsx
  │   ├── select.tsx
  │   ├── card.tsx
  │   ├── alert.tsx
  │   ├── dialog.tsx
  │   ├── table.tsx
  │   └── form.tsx
  ├── forms/          
  │   ├── user-form.tsx
  │   ├── post-form.tsx
  │   └── schemas.ts
  ├── modals/          
  │   ├── create-user-modal.tsx
  │   ├── edit-user-modal.tsx
  │   ├── create-post-modal.tsx
  │   └── edit-post-modal.tsx
  ├── header.tsx       
  ├── user.tsx
  ├── post.tsx
  ├── data-table.tsx
  └── stat-card.tsx
```
  
모달은 Global Context로 관리하지 않고 페이지 단위에서 상태를 직접 제어하는 Controlled Modal 방식으로 구성했다. 지금 상황에서는 그게 더 직관적이라고 판단하였다.

서비스 CRUD 함수(userService.create, userService.delete 등)는 모두 엔티티 최상단 컴포넌트에서 호출하도록 했다. Create Modal은 onSubmit props로 핸들러를 주입받아 UI만 담당하고, 실제 userService.create() 호출과 Alert 처리, 데이터 refetch는 부모 컴포넌트에서 한다. 이렇게하면 모달은 재사용 가능하게 순수하게 유지되고, 비즈니스 로직은 한 곳에 집중된다.

폼의 스키마 역시 과한 추상화를 하지 않도록 했다. 필드 단위에서까지 공통화를 하지 않도록 하였다. (User의 email과 Post의 email은 현재는 같지만 언제든 달라질 수 있다.) 폼은 등록, 수정 폼이 현재로는 동일하기 때문에 폼 내부는 하나의 컴포넌트로 두되, 폼은 RHF 인스턴스로 개별적으로 관리하도록 하였다. 스키마는 별도로 분리했다. 나중에 등록/수정 폼 UI가 달라지면 그때 분리하면 될 것이다.

DataTable은 범용적으로 각 컬럼의 key, label, render 함수를 정의할 수 있게 하여, Badge나 Button 같은 커스텀 렌더링이 필요한 경우에도 유연하게 대응할 수 있도록 했다.

약간 궁금했던점은 shadcn 기본 사양에선 button 요소에 cursor: pointer가 적용되지 않는다는 것.  글로벌 css에서 cursor: pointer를 오버라이드 했다. 취향 문제일까?
