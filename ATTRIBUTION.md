# Bible text sources and public-domain notes

The bilingual reader bundles these two 66-book Protestant-canon translations:

- **English:** World English Bible (WEB), published as public domain by eBible.org: <https://ebible.org/Scriptures/details.php?id=engwebp>
- **Arabic:** Arabic Van Dyck Bible (AVD/VDV), published as public domain by eBible.org: <https://ebible.org/Scriptures/details.php?id=arb-vd>

The JSON verse data was obtained through the Free Use Bible API at <https://bible.helloao.org/> and packaged locally at `assets/bible/bible-data.json`. The reader only needs this bundled file; it does not call the Bible API when visitors read or search.

The package keeps verse numbers and verse text, pairing corresponding book/chapter/verse numbers when available. Editorial headings, footnotes, audio links, and study notes are omitted. The source translations' verse wording is otherwise retained. The WEB and Van Dyck editions included here have 66 books; Deuterocanonical/Apocryphal books are not included.
