# JSON to variables
This action reads json file and writes its content as environment variables.

## Inputs

### `filename`

**Required** The JSON file.

### `prefix`

(Optional) the prefix for all variables. Default value is empty string.

### `has_secrets`

(Optional) Identifies whether file has variables considered as secrets. If `true` - adds all variables to github secrets to be masked in logs. Default value `false`

## Usage

### File content 
```json
{
    "value": "value",
    "array": [
        {
            "value": "value 0"
        },
        "value 1"
    ],
    "obj": {
        "value1": "value1",
        "value2": "value2"
    }
}
```

### YML example 
```yml
- name: JSON to variables
  uses: antifree/json-to-variables@v1.3.0 # x-release-please-version
  with:
    filename: 'test.json'
    prefix: 'test'
    has_secrets: true
- name: Show output
  run: echo "The time was ${{ env.test_value }}, ${{ env.test_array_0_value }}, ${{ env.test_obj_value1 }}"
```
