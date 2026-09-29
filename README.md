# Valtomatic

Initial interface skeleton for the non-custodial fiat/crypto exchange described in `../VALTOMATIC/crypto-exchange-master-prompt.md`.

The current slice includes an email/password registration start using Supabase Auth with email confirmation. The phone field remains an unpersisted UI field until a separate verified-phone flow is designed.

It intentionally does not include:

- no Bridge API integration;
- no real assets, rates, balances, quotes, or transaction data;
- no external navigation or production financial behavior.

The converter toggle and navigation are local UI state to demonstrate the intended layout and interaction boundaries.
