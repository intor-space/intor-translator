import type { CoreTranslatorOptions } from "@/translators/core-translator";
import type {
  LocaleNamespaceMessages,
  Replacement,
  RichReplacement,
  IsLoadingRef,
  InferTranslatorKey,
} from "@/types";
import { translate } from "@/translator-methods/translate";
import { BaseTranslator } from "@/translators/base-translator";

export class CoreTranslator<
  M extends LocaleNamespaceMessages = never,
> extends BaseTranslator<M> {
  protected options: CoreTranslatorOptions<M>;
  protected isLoadingRef: IsLoadingRef = { current: false };

  constructor(options: CoreTranslatorOptions<M>) {
    super(options);
    this.options = options;
  }

  /** Get the current loading state. */
  public get isLoading(): boolean {
    return this.isLoadingRef.current;
  }

  /** Set the loading state. */
  public setLoading(state: boolean) {
    this.isLoadingRef.current = state;
  }

  public t = <Result = string>(
    key: InferTranslatorKey<M>,
    replacements?: Replacement | RichReplacement,
  ): Result => {
    return translate({
      messagesRef: this.messagesRef,
      localeRef: this.localeRef,
      isLoadingRef: this.isLoadingRef,
      translateConfig: this.options,
      key,
      replacements,
    });
  };
}
