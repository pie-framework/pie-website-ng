# QTI 2.1 vs 2.2 Specification Analysis: Core vs Extensions

**Analysis Date:** December 26, 2025
**Sources:** Official IMS Global/1EdTech XSD schemas, specification documents, and qti-examples repository

## Executive Summary

Based on direct analysis of the official QTI XSD schemas from IMS Global (now 1EdTech):

- **`assessmentStimulus`** is a CORE element in QTI 2.2 (added in v2.2, NOT in 2.1)
- **`assessmentPassage`** is NOT defined in either QTI 2.1 or 2.2 core specifications
- **`stimulus`** is NOT a top-level element in any QTI specification
- **APIP** is an extension to QTI that adds accessibility features but does NOT define stimulus or passage elements

## Official QTI 2.1 Core Elements

From `https://www.imsglobal.org/xsd/imsqti_v2p1.xsd`:

### Top-Level Assessment Elements
```xml
<xs:element name="assessmentItem" type="AssessmentItem.Type"/>
<xs:element name="assessmentSection" type="AssessmentSection.Type"/>
<xs:element name="assessmentTest" type="AssessmentTest.Type"/>
<xs:element name="assessmentItemRef" type="AssessmentItemRef.Type"/>
<xs:element name="assessmentSectionRef" type="AssessmentSectionRef.Type"/>
```

**Key Finding:** QTI 2.1 has NO `assessmentStimulus` element. There is no official way to define standalone stimulus content in QTI 2.1.

## Official QTI 2.2 Core Elements

From `https://www.imsglobal.org/xsd/imsqti_v2p2.xsd`:

### Top-Level Assessment Elements
```xml
<xs:element name="assessmentItem" type="AssessmentItem.Type" />
<xs:element name="assessmentSection" type="AssessmentSection.Type" />
<xs:element name="assessmentTest" type="AssessmentTest.Type" />
<xs:element name="assessmentItemRef" type="AssessmentItemRef.Type" />
<xs:element name="assessmentSectionRef" type="AssessmentSectionRef.Type" />
<xs:element name="assessmentStimulus" type="AssessmentStimulus.Type" />      ← NEW IN 2.2
<xs:element name="assessmentStimulusRef" type="AssessmentStimulusRef.Type" /> ← NEW IN 2.2
```

**Key Finding:** QTI 2.2 ADDED `assessmentStimulus` and `assessmentStimulusRef` as new core elements.

### AssessmentStimulus Definition

From the QTI 2.2 XSD:

```xml
<xs:complexType name="AssessmentStimulus.Type" abstract="false" mixed="false">
    <xs:annotation>
        <xs:documentation source="documentation">
            An assessment stimulus object is the used to enable content to be shared by several
            Assessment Items. The key feature is that this shared stimulus content must be supplied
            in the same context for each of the Assessment Items that make use of it. The assessment
            stimulus approach provides a mechanism to allow the stimulus content to be managed
            independently.
        </xs:documentation>
    </xs:annotation>
    <xs:sequence>
        <xs:element ref="stylesheet" minOccurs="0" maxOccurs="unbounded" />
        <xs:element ref="stimulusBody" minOccurs="1" maxOccurs="1" />
        <xs:element ref="apip:apipAccessibility" minOccurs="0" maxOccurs="1" />
    </xs:sequence>
    <xs:attributeGroup ref="identifier.AssessmentStimulus.Attr" />
    <xs:attributeGroup ref="title.AssessmentStimulus.Attr" />
</xs:complexType>
```

**Structure:**
- Root element: `<assessmentStimulus>`
- Contains: `<stimulusBody>` (required, analogous to `<itemBody>`)
- Supports: APIP accessibility extensions
- Purpose: Shared content managed independently from items

## What About `assessmentPassage`?

**CRITICAL FINDING:** `assessmentPassage` does NOT exist in any official QTI specification.

### Evidence:
1. **QTI 2.1 XSD:** No mention of `assessmentPassage`
2. **QTI 2.2 XSD:** No mention of `assessmentPassage`
3. **APIP 1.0 XSD:** No mention of `assessmentPassage`
4. **1EdTech qti-examples repo:** 450 XML files, ZERO contain `assessmentPassage`

The only occurrence of the word "passage" in QTI 2.2 XSD is in documentation:
```
"selectable runs of text embedded within a surrounding context, such as a simple passage of text"
```
This is just descriptive text in the hotText interaction documentation, not an element definition.

### Conclusion About assessmentPassage

**`assessmentPassage` appears to be:**
1. A vendor-specific extension (not standardized)
2. A common misconception or naming convention
3. Used interchangeably with `assessmentStimulus` by some implementations
4. NOT part of any official IMS Global/1EdTech specification

## What About the `<stimulus>` Element?

There is NO top-level `<stimulus>` element in QTI specifications.

However, some QTI implementations may support:
- Inline stimulus content within `<itemBody>` (vendor-specific)
- Content before interactions treated as stimulus
- Custom extensions using `<stimulus>` tags

**From the PIE codebase analysis:**
The pie-transform library's test fixture shows:
```xml
<assessmentStimulus xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1"
                    identifier="stimulus-industrial-revolution"
                    title="The Industrial Revolution">
  <itemBody>
    <!-- Content here -->
  </itemBody>
</assessmentStimulus>
```

**Issue:** This fixture uses QTI 2.1 namespace (`imsqti_v2p1`) but `assessmentStimulus` only exists in QTI 2.2. This is technically invalid.

## APIP: Accessible Portable Item Protocol

### Official Status
- **Type:** Extension specification to QTI
- **Current Version:** APIP 1.0 (based on QTI 2.1)
- **Successor:** Features integrated into QTI 3.0 (released May 2022)
- **Organization:** IMS Global/1EdTech

### Purpose
APIP extends QTI to add accessibility features, incorporating the "Access For All Personal Needs & Preferences (AfA PNP) v2.0 specification."

### What APIP Adds

From the APIP specification:

**New Elements:**
1. **`apipAccessibility`** - Root container for all accessibility extensions
2. **`CompanionMaterialsInfo`** - Describes permitted materials (calculators, rulers, reading passages)
3. **`ExternalSupplementalAccessibility`** - Text-to-speech and pronunciation
4. **`InclusionOrder`** - Rendering sequences for Braille, ASL, audio
5. **`AccessibilityInfo`** - Alternative content representations via `AccessElement`
6. **`ContentLinkInfo`** - Links alternative content to existing QTI elements

**Key Finding:** APIP does NOT define `assessmentStimulus`, `assessmentPassage`, or `stimulus` elements. It only adds accessibility metadata and alternative content linking.

### APIP Integration with QTI 2.2

The QTI 2.2 XSD shows APIP integration:
```xml
<xs:element ref="apip:apipAccessibility" minOccurs="0" maxOccurs="1" />
```

This appears in `assessmentStimulus` and `assessmentItem` definitions, allowing optional APIP accessibility extensions.

## Manifest Resource Types

From the PIE codebase manifest parser:

### Official QTI Resource Types
```typescript
export type ResourceType =
  | 'imsqti_item_xmlv2p1'           // QTI 2.1 item
  | 'imsqti_item_xmlv2p2'           // QTI 2.2 item
  | 'imsqti_test_xmlv2p1'           // QTI 2.1 test
  | 'imsqti_test_xmlv2p2'           // QTI 2.2 test
  | 'imsqti_assessment_xmlv2p1'     // QTI 2.1 assessment
  | 'imsqti_apip_xmlv2p2'           // APIP content (typically stimulus)
  | 'webcontent'                    // Generic web content
  | 'associatedcontent/imsqti_item_xmlv2p1'
```

### Manifest Example with APIP Stimulus

```xml
<manifest>
  <resources>
    <resource identifier="passage-001" type="imsqti_apip_xmlv2p2">
      <file href="passage-001.xml"/>
    </resource>
    <resource identifier="item-001" type="imsqti_item_xmlv2p1">
      <file href="item-001.xml"/>
      <dependency identifierref="passage-001"/>
    </resource>
  </resources>
</manifest>
```

**Note:** The resource type `imsqti_apip_xmlv2p2` indicates APIP-enhanced content, which in practice often contains an `assessmentStimulus` element.

## Summary Table

| Element/Feature | QTI 2.1 | QTI 2.2 | APIP 1.0 | Status |
|----------------|---------|---------|----------|--------|
| `assessmentItem` | ✅ Core | ✅ Core | ✅ Enhanced | Official |
| `assessmentTest` | ✅ Core | ✅ Core | ✅ Enhanced | Official |
| `assessmentSection` | ✅ Core | ✅ Core | - | Official |
| `assessmentStimulus` | ❌ Not in spec | ✅ Core (NEW) | - | Official (2.2+) |
| `assessmentStimulusRef` | ❌ Not in spec | ✅ Core (NEW) | - | Official (2.2+) |
| `assessmentPassage` | ❌ Not in spec | ❌ Not in spec | ❌ Not in spec | **NOT OFFICIAL** |
| `<stimulus>` element | ❌ Not in spec | ❌ Not in spec | ❌ Not in spec | **NOT OFFICIAL** |
| `stimulusBody` | ❌ Not in spec | ✅ Core (part of assessmentStimulus) | - | Official (2.2+) |
| `itemBody` | ✅ Core | ✅ Core | ✅ Enhanced | Official |
| `apipAccessibility` | - | - | ✅ Extension | APIP Extension |

## Recommendations

### For QTI Content Creators

1. **Use QTI 2.2+ for stimulus content:** If you need standalone shared stimulus, use `assessmentStimulus` with QTI 2.2 namespace
2. **Avoid `assessmentPassage`:** This is not a standard element; use `assessmentStimulus` instead
3. **Proper namespace usage:**
   - QTI 2.1: `http://www.imsglobal.org/xsd/imsqti_v2p1`
   - QTI 2.2: `http://www.imsglobal.org/xsd/imsqti_v2p2`

### For QTI Transformers/Players

1. **Support `assessmentStimulus` (QTI 2.2):** This is the official way to handle shared stimulus
2. **Handle `assessmentPassage` gracefully:** Treat it as equivalent to `assessmentStimulus` (vendor extension)
3. **Check namespace:** Validate that `assessmentStimulus` uses QTI 2.2 namespace
4. **APIP integration:** Support optional `apipAccessibility` elements within stimulus

### For PIE Framework

**Current Implementation Issues:**

1. **Test fixture uses wrong namespace:**
   ```xml
   <!-- INCORRECT (in industrial-revolution.xml) -->
   <assessmentStimulus xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1">

   <!-- CORRECT -->
   <assessmentStimulus xmlns="http://www.imsglobal.org/xsd/imsqti_v2p2">
   ```

2. **Code references non-existent element:**
   - Multiple files reference `assessmentPassage`
   - Should clarify this is a vendor extension, not official QTI

**Recommended Fixes:**

1. Update test fixtures to use QTI 2.2 namespace for `assessmentStimulus`
2. Add comments explaining that `assessmentPassage` is a vendor extension
3. Document that passage handling is for compatibility, not spec compliance

## Official Sources

### XSD Schema Files
- QTI 2.1: `https://www.imsglobal.org/xsd/imsqti_v2p1.xsd` (9,884 lines)
- QTI 2.2: `https://www.imsglobal.org/xsd/imsqti_v2p2.xsd`
- APIP 1.0: `https://www.imsglobal.org/apip/apipv1p0/APIP_QTI_XSD/qtiv2p1_apipv1p0_v1p0.xsd` (344 lines)

### Specification Documents
- 1EdTech QTI: `https://www.1edtech.org/standards/qti`
- 1EdTech APIP: `https://www.1edtech.org/standards/accessible-portable-item-protocol`
- QTI Examples: `https://github.com/1EdTech/qti-examples`

### Key Documentation
- QTI 2.2 released: September 1, 2015
- QTI 2.2.4 (bug fixes): March 2021
- QTI 2.1 certification deprecated: December 31, 2023
- QTI 2.1 certifications expire: December 31, 2024
- QTI 3.0 released: May 2022 (incorporates APIP features)

## Conclusion

**What's Official:**
- `assessmentStimulus` (QTI 2.2+) - for standalone shared stimulus content
- `stimulusBody` (QTI 2.2+) - content container within assessmentStimulus
- APIP extensions for accessibility (separate specification)

**What's NOT Official:**
- `assessmentPassage` - vendor extension or common misconception
- `<stimulus>` as top-level element - not in any specification
- Using `assessmentStimulus` with QTI 2.1 namespace - technically invalid

**Best Practice:**
Use QTI 2.2 `assessmentStimulus` for official compliance, but support `assessmentPassage` as a vendor extension for real-world compatibility.
