import {
  Button,
  Container,
  Content,
  Item,
  Label,
  Separator,
} from '@tansuk/rott-ui';

/**
 * Visual verification for GitHub issues #8 and #9.
 *
 * Both defects were invisible to the compiler and to the test suite as it stood —
 * the code type-checked, rendered, and warned about nothing. The only way to see
 * either one was to look. This screen puts each case on screen next to a control.
 *
 * Swap this in for EntryScreen in App.tsx to check by eye.
 */

const SectionTitle = ({children}: {children: string}) => (
  <Item marginTop={24} marginBottom={8}>
    <Label fontSize="lg" fontFamily="Markpro-Medium" variant="white">
      {children}
    </Label>
  </Item>
);

const Caption = ({children}: {children: string}) => (
  <Item marginBottom={8}>
    <Label fontSize="sm" variant="grey-200">
      {children}
    </Label>
  </Item>
);

export default function ButtonContractScreen() {
  return (
    <Container>
      <Content flex={1} scrollEnabled>
        {/* ---------------------------------------------------------------
            Issue #8 — borderWidth / borderColor were ignored on every
            non-outline variant, and borderColor was hardcoded to 'white'.
            The first button below was invisible on a light background.
        ---------------------------------------------------------------- */}
        <SectionTitle>#8 — border props on a non-outline variant</SectionTitle>

        <Caption>
          Both buttons sit on a near-white surface — the condition from the issue,
          where a brand-fixed white fill makes the border the only thing separating
          the control from the page. The first declares a 1px #747775 border, the
          second declares none. Before the fix both looked like the second one.
        </Caption>

        <Item
          backgroundColor="grey-100"
          paddingHorizontal={16}
          paddingVertical={16}
          borderRadius={12}>
          <Button
            testID="oauth-google-button"
            variant="white"
            color="grey-900"
            size="full"
            borderWidth={1}
            borderColor="#747775"
            onPress={() => {}}>
            Sign in with Google
          </Button>

          <Button
            testID="no-border-button"
            variant="white"
            color="grey-900"
            size="full"
            marginTop={12}
            onPress={() => {}}>
            No border props (control)
          </Button>
        </Item>

        <SectionTitle>#8 — outline fallback must not regress</SectionTitle>

        <Caption>Outline variant, no border props. Keeps its 2px variant-coloured border.</Caption>

        <Button
          testID="outline-default-button"
          variant="primary-outline"
          size="full"
          onPress={() => {}}>
          Outline (variant border)
        </Button>

        <Caption>Outline variant + explicit red border. The explicit value must win.</Caption>

        <Button
          testID="outline-override-button"
          variant="primary-outline"
          size="full"
          borderWidth={3}
          borderColor="#D32F2F"
          onPress={() => {}}>
          Outline (explicit border)
        </Button>

        <Separator height={1} variant="neutral-grey-alpha-200" marginTop={24} />

        {/* ---------------------------------------------------------------
            Issue #9 — size="full" resolved to a fixed 342px scaled to the
            device, so it overflowed any parent narrower than the reference
            device's content box. The padded card below is the failing case.
        ---------------------------------------------------------------- */}
        <SectionTitle>#9 — size="full" inside a padded card</SectionTitle>

        <Caption>
          The button must stay inside the grey card. Before the fix it was a fixed
          width and spilled past the card's padding.
        </Caption>

        <Item
          backgroundColor="grey-100"
          paddingHorizontal={24}
          paddingVertical={24}
          borderRadius={12}>
          <Button
            testID="full-in-card-button"
            variant="primary"
            size="full"
            onPress={() => {}}>
            Full width in a padded card
          </Button>
        </Item>

        <SectionTitle>#9 — xl and xxl are distinct sizes</SectionTitle>

        <Caption>
          These three were indistinguishable before the fix — all of them rendered at
          the same fixed width. Each should now be visibly narrower than the next.
        </Caption>

        {/* Each button must be a DIRECT child here. Wrapping one in a nested <Item>
            makes that Item shrink to its content, and the percentage then resolves
            against the shrunken box instead of the screen — which renders xl wider
            than xxl. That is flexbox, not a Button bug, but it is a good reminder
            that percentage widths depend on the parent having a resolved width. */}
        <Item alignItemsCenter>
          <Button testID="xl-button" variant="primary" size="xl" onPress={() => {}}>
            xl — 85%
          </Button>

          <Button
            testID="xxl-button"
            variant="primary"
            size="xxl"
            marginTop={8}
            onPress={() => {}}>
            xxl — 92.5%
          </Button>

          <Button
            testID="full-button"
            variant="primary"
            size="full"
            marginTop={8}
            onPress={() => {}}>
            full — 100%
          </Button>
        </Item>

        <SectionTitle>Fixed sizes — unchanged by this patch</SectionTitle>

        <Item alignItemsCenter marginBottom={48}>
          <Button testID="sm-button" variant="secondary" size="sm" onPress={() => {}}>
            sm
          </Button>

          <Button
            testID="lg-button"
            variant="secondary"
            size="lg"
            marginTop={8}
            onPress={() => {}}>
            lg
          </Button>
        </Item>
      </Content>
    </Container>
  );
}
