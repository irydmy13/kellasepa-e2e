# TESTPLAN

Projekt: Kellasepa teenused — E2E kontroll kasutaja teekonna põhisammudele.  
Testid katavad sisselogimise, navigeerimise, juurdepääsuõigused ja väljalogimise.  
Eesmärk: kinnitada, et tavaline kasutus (login → avaleht → navigeerimine → logout) toimib stabiilselt.  
Kriitilised punktid: loginivorm, kaitstud lehed, avalehe tervitus, rollipõhine ligipääs.  
Testid on iseseisvad, ilma kunstlike ooteaegadeta, kasutavad ainult selgeid ootusi.  
Tulemused on reprodutseeritavad puhtal arvutil vastavalt README juhendile.

## Stsenaariumid (algseis / tegevus / ootus)

1. **Auth: õige login**
   - Algseis: külaline on login-lehel.
   - Tegevus: sisestab kehtivad andmed, kinnitab.
   - Ootus: lahkub `login.php`-lt, avalehel kuvatakse tervitus.

2. **Auth: vale parool / tühjad väljad**
   - Algseis: külaline login-lehel.
   - Tegevus: esitab tühja vormi või vale parooliga.
   - Ootus: jääb `login.php`-le; juurdepääsu ei anta.

3. **Smoke: pärast login’it**
   - Algseis: kasutaja on edukalt sisse loginud.
   - Tegevus: avab avalehe.
   - Ootus: näeb tervitus-teksti; leht on laaditud /kellasepa/ all.

4. **Navigeerimine**
   - Algseis: sisse loginud kasutaja.
   - Tegevus: avab avaleht/teenused/tellimused (kui olemas).
   - Ootus: iga leht avaneb /kellasepa/ all, navigeerimine töötab.

5. **Logout ja ligipääs**
   - Algseis: sisse loginud kasutaja.
   - Tegevus: teeb logout’i; üritab avada `haldus.php`.
   - Ootus: jõuab `login.php`-le; kaitstud leht nõuab sisselogimist.
