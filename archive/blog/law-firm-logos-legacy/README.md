# Legacy law-firm-logos article archive

Capture date: 2026-08-27

Canonical source: https://ebaqdesign.com/blog/law-firm-logos

The raw production fetch is preserved in `raw-live.html`. At capture time the production URL returned the application shell rather than the historical article body, so it contains no recoverable article markup or article-specific image references. The historical article body and its image set are therefore isolated under `recovered-from-repo/` and `images/`, respectively, with provenance kept explicit rather than mixed into the raw capture.

`recovered-from-repo/legacy-article-body.html` is the literal legacy `body` field from the repository article JSON. `recovered-from-repo/cleaned-article-body.html` is the same recovered snapshot prepared for offline reading with local image references where matched. It is not runtime content and is not imported by the application.

`manifest.tsv` records each recovered image filename, byte size, SHA-256 checksum, detected dimensions/type, and MIME type. Nine article identity images were recovered. No inaccessible image URL was found in the repository source for this set; the live shell itself exposed no article assets to independently download.

The non-www URL was not used as a separate source because the canonical www URL already returned the shell; no redirect or additional legacy content was inferred.
