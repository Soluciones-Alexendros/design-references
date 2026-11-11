/**
 * React wrappers — HTML matches canonical renderX (see test-wrappers).
 * Deprecated string helpers reexported for migration until 0.2.0.
 */
export {
  Button,
  Input,
  Card,
  Alert,
  Link,
  Stack,
  Field,
  Select,
  Checkbox,
  Banner,
  ThemeToggle,
} from "./primitives.js";

export { StatusIcon } from "./StatusIcon.js";

/** @deprecated Use Button from `/react`. Kept until 0.2.0. */
export { renderButton } from "../components/Button.js";
/** @deprecated Use Input from `/react`. Kept until 0.2.0. */
export { renderInput } from "../components/Input.js";
/** @deprecated Use Card from `/react`. Kept until 0.2.0. */
export { renderCard } from "../components/Card.js";
/** @deprecated Use Alert from `/react`. Kept until 0.2.0. */
export { renderAlert } from "../components/Alert.js";
/** @deprecated Use Link from `/react`. Kept until 0.2.0. */
export { renderLink } from "../components/Link.js";
/** @deprecated Use Stack from `/react`. Kept until 0.2.0. */
export { renderStack } from "../components/Stack.js";
/** @deprecated Use Field from `/react`. Kept until 0.2.0. */
export { renderField } from "../components/Field.js";
/** @deprecated Use Select from `/react`. Kept until 0.2.0. */
export { renderSelect } from "../components/Select.js";
/** @deprecated Use Checkbox from `/react`. Kept until 0.2.0. */
export { renderCheckbox } from "../components/Checkbox.js";
/** @deprecated Use Banner from `/react`. Kept until 0.2.0. */
export { renderBanner } from "../components/Banner.js";
/** @deprecated Use ThemeToggle from `/react`. Kept until 0.2.0. */
export {
  renderThemeToggle,
  attachThemeToggle,
} from "../components/ThemeToggle.js";
